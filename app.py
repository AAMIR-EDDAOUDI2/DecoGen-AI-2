import os
import io
import uuid
import threading
import requests
import psycopg2
import cloudinary
import cloudinary.uploader
from psycopg2.extras import RealDictCursor
from flask import (Flask, request, jsonify, send_file,
                   render_template, redirect, url_for,
                   session, abort)
from authlib.integrations.flask_client import OAuth
from room_decorator import RoomDecoratorApp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="/static")
app.secret_key = os.getenv("SECRET_KEY", "dev-secret-change-this")

# ── CLOUDINARY ────────────────────────────────────────────────
cloudinary.config(
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key    = os.getenv("CLOUDINARY_API_KEY"),
    api_secret = os.getenv("CLOUDINARY_API_SECRET"),
    secure     = True
)

# ── GOOGLE OAUTH ──────────────────────────────────────────────
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id     = os.getenv("GOOGLE_CLIENT_ID"),
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url = 'https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs = {'scope': 'openid email profile'}
)

# ── IN-MEMORY JOB STORE ───────────────────────────────────────
jobs = {}

# ── DATABASE ──────────────────────────────────────────────────
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db():
    return psycopg2.connect(DATABASE_URL, sslmode='require')

def init_db():
    try:
        conn = get_db()
        c    = conn.cursor()

        c.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id         SERIAL PRIMARY KEY,
                google_id  TEXT UNIQUE NOT NULL,
                name       TEXT,
                email      TEXT,
                avatar_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        c.execute("""
            CREATE TABLE IF NOT EXISTS designs (
                id           SERIAL PRIMARY KEY,
                user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
                prompt       TEXT,
                style        TEXT,
                image_url    TEXT NOT NULL,
                created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        c.execute("""
            CREATE TABLE IF NOT EXISTS reviews (
                id         SERIAL PRIMARY KEY,
                name       TEXT    NOT NULL,
                rating     INTEGER NOT NULL,
                comment    TEXT    NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.commit()
        conn.close()
        print("[DB] All tables ready.", flush=True)
    except Exception as e:
        print(f"[DB ERROR] {e}", flush=True)

init_db()


# ── AUTH HELPERS ──────────────────────────────────────────────
def get_current_user():
    return session.get('user')

def login_required(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        if not get_current_user():
            return redirect(url_for('auth_login'))
        return f(*args, **kwargs)
    return decorated


# ── ROOM DECORATOR ────────────────────────────────────────────
def get_decorator():
    api_key = os.getenv("BFL_API_KEY")
    if not api_key:
        return None
    return RoomDecoratorApp(api_key)


def run_generation(job_id, image_bytes, decoration_prompt, aspect_ratio, user_id=None):
    try:
        decorator = get_decorator()
        if not decorator:
            jobs[job_id] = {"status": "error", "error": "BFL_API_KEY not configured"}
            return

        result_url = decorator.decorate_room(
            room_image_bytes=image_bytes,
            decoration_prompt=decoration_prompt,
            aspect_ratio=aspect_ratio
        )

        response = requests.get(result_url, timeout=120)
        response.raise_for_status()
        result_bytes = response.content

        cloudinary_url = None
        if user_id:
            try:
                upload = cloudinary.uploader.upload(
                    io.BytesIO(result_bytes),
                    folder="decogen",
                    public_id=f"design_{job_id}",
                    resource_type="image"
                )
                cloudinary_url = upload.get("secure_url")

                conn = get_db()
                cur  = conn.cursor()
                cur.execute(
                    "INSERT INTO designs (user_id, prompt, image_url) VALUES (%s, %s, %s)",
                    (user_id, decoration_prompt, cloudinary_url)
                )
                conn.commit()
                conn.close()
                print(f"[DB] Design saved for user {user_id}", flush=True)
            except Exception as ce:
                print(f"[CLOUDINARY ERROR] {ce}", flush=True)

        jobs[job_id] = {
            "status":         "done",
            "result_bytes":   result_bytes,
            "cloudinary_url": cloudinary_url
        }

    except Exception as e:
        print(f"[ERROR] Job {job_id} failed: {e}", flush=True)
        jobs[job_id] = {"status": "error", "error": str(e)}


# ── MAIN ROUTES ───────────────────────────────────────────────
@app.route("/")
def index():
    user = get_current_user()
    return render_template("index.html", user=user)


@app.route("/decorate-room", methods=["POST"])
def decorate_room():
    try:
        ar_map = {"169": "16:9", "11": "1:1", "916": "9:16"}
        room_image        = request.files.get("roomimage")
        decoration_prompt = request.form.get("decorationprompt", "").strip()
        aspect_ratio      = ar_map.get(request.form.get("aspectratio", "169"), "16:9")

        if not room_image:
            return jsonify({"error": "No image uploaded"}), 400
        if not decoration_prompt:
            return jsonify({"error": "Please describe a style"}), 400

        api_key = os.getenv("BFL_API_KEY")
        if not api_key:
            return jsonify({"error": "BFL_API_KEY not configured on server"}), 500

        image_bytes = room_image.read()
        if len(image_bytes) == 0:
            return jsonify({"error": "Uploaded file is empty"}), 400

        user    = get_current_user()
        user_id = user.get('db_id') if user else None

        job_id = str(uuid.uuid4())
        jobs[job_id] = {"status": "processing", "before_bytes": image_bytes}

        thread = threading.Thread(
            target=run_generation,
            args=(job_id, image_bytes, decoration_prompt, aspect_ratio, user_id),
            daemon=True
        )
        thread.start()

        return jsonify({"job_id": job_id}), 202

    except Exception as e:
        print(f"[ERROR] /decorate-room crashed: {e}", flush=True)
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@app.route("/status/<job_id>")
def check_status(job_id):
    job = jobs.get(job_id)
    if not job:
        return jsonify({"status": "not_found"}), 404
    if job["status"] == "processing":
        return jsonify({"status": "processing"}), 200
    if job["status"] == "error":
        return jsonify({"status": "error", "error": job.get("error")}), 200
    return jsonify({"status": "done"}), 200


@app.route("/result/<job_id>")
def get_result(job_id):
    job = jobs.get(job_id)
    if not job or job["status"] != "done":
        return jsonify({"error": "Result not ready"}), 404
    return send_file(
        io.BytesIO(job["result_bytes"]),
        mimetype="image/jpeg",
        as_attachment=False,
        download_name="decogen-result.jpg"
    )


@app.route("/before/<job_id>")
def get_before(job_id):
    job = jobs.get(job_id)
    if not job or "before_bytes" not in job:
        return jsonify({"error": "Original not found"}), 404
    return send_file(
        io.BytesIO(job["before_bytes"]),
        mimetype="image/jpeg",
        as_attachment=False,
        download_name="decogen-original.jpg"
    )


# ── AUTH ROUTES ───────────────────────────────────────────────
@app.route("/auth/login")
def auth_login():
    redirect_uri = url_for('auth_callback', _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route("/auth/callback")
def auth_callback():
    try:
        token    = google.authorize_access_token()
        userinfo = token.get('userinfo')
        if not userinfo:
            return redirect('/')

        google_id  = userinfo['sub']
        name       = userinfo.get('name', '')
        email      = userinfo.get('email', '')
        avatar_url = userinfo.get('picture', '')

        conn = get_db()
        cur  = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("""
            INSERT INTO users (google_id, name, email, avatar_url)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (google_id) DO UPDATE
            SET name = EXCLUDED.name,
                email = EXCLUDED.email,
                avatar_url = EXCLUDED.avatar_url
            RETURNING id
        """, (google_id, name, email, avatar_url))

        row = cur.fetchone()
        conn.commit()
        conn.close()

        session['user'] = {
            'db_id':  row['id'],
            'name':   name,
            'email':  email,
            'avatar': avatar_url
        }

        return redirect('/')

    except Exception as e:
        print(f"[AUTH ERROR] {e}", flush=True)
        return redirect('/')


@app.route("/auth/logout")
def auth_logout():
    session.clear()
    return redirect('/')


@app.route("/auth/me")
def auth_me():
    user = get_current_user()
    if not user:
        return jsonify({"logged_in": False}), 200
    return jsonify({
        "logged_in": True,
        "name":      user['name'],
        "email":     user['email'],
        "avatar":    user['avatar']
    }), 200


# ── DESIGNS PAGE ──────────────────────────────────────────────
@app.route("/designs")
@login_required
def designs_page():
    user    = get_current_user()
    user_id = user['db_id']
    conn    = get_db()
    cur     = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("""
        SELECT id, prompt, image_url, created_at
        FROM designs
        WHERE user_id = %s
        ORDER BY created_at DESC
    """, (user_id,))
    rows = cur.fetchall()
    conn.close()
    designs = [
        {
            "id":         r["id"],
            "prompt":     r["prompt"],
            "image_url":  r["image_url"],
            "created_at": str(r["created_at"])
        }
        for r in rows
    ]
    return render_template("designs.html", user=user, designs=designs)


@app.route("/designs/delete/<int:design_id>", methods=["DELETE"])
@login_required
def delete_design(design_id):
    user    = get_current_user()
    user_id = user['db_id']
    conn    = get_db()
    cur     = conn.cursor()
    cur.execute(
        "DELETE FROM designs WHERE id = %s AND user_id = %s",
        (design_id, user_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"success": True}), 200


# ── REVIEWS ───────────────────────────────────────────────────
@app.route("/submit-review", methods=["POST"])
def submit_review():
    try:
        data    = request.get_json()
        name    = data.get("name", "").strip()
        rating  = int(data.get("rating", 0))
        comment = data.get("comment", "").strip()

        if not name or not comment:
            return jsonify({"error": "Name and comment are required"}), 400
        if rating < 1 or rating > 5:
            return jsonify({"error": "Rating must be between 1 and 5"}), 400
        if len(comment) > 500:
            return jsonify({"error": "Comment too long (max 500 chars)"}), 400

        conn = get_db()
        c    = conn.cursor()
        c.execute(
            "INSERT INTO reviews (name, rating, comment) VALUES (%s, %s, %s)",
            (name, rating, comment)
        )
        conn.commit()
        conn.close()
        return jsonify({"success": True}), 201

    except Exception as e:
        print(f"[ERROR] /submit-review: {e}", flush=True)
        return jsonify({"error": "Failed to save review"}), 500


@app.route("/get-reviews")
def get_reviews():
    try:
        conn = get_db()
        c    = conn.cursor(cursor_factory=RealDictCursor)
        c.execute(
            "SELECT name, rating, comment, created_at FROM reviews ORDER BY created_at DESC LIMIT 20"
        )
        rows = c.fetchall()
        conn.close()
        reviews = [
            {
                "name":       r["name"],
                "rating":     r["rating"],
                "comment":    r["comment"],
                "created_at": str(r["created_at"])
            }
            for r in rows
        ]
        return jsonify({"reviews": reviews}), 200

    except Exception as e:
        print(f"[ERROR] /get-reviews: {e}", flush=True)
        return jsonify({"error": "Failed to fetch reviews"}), 500


# ── ERROR HANDLERS ────────────────────────────────────────────
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Route not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
