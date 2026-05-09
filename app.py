import os
import io
import uuid
import threading
import requests
import sqlite3
from flask import Flask, request, jsonify, send_file, render_template
from room_decorator import RoomDecoratorApp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="/static")

# In-memory job store: { job_id: { status, result_bytes, error, before_bytes } }
jobs = {}

# ── DATABASE SETUP ────────────────────────────────────────────
def init_db():
    conn = sqlite3.connect("reviews.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS reviews (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            name      TEXT    NOT NULL,
            rating    INTEGER NOT NULL,
            comment   TEXT    NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()


def get_decorator():
    api_key = os.getenv("BFL_API_KEY")
    if not api_key:
        return None
    return RoomDecoratorApp(api_key)


def run_generation(job_id, image_bytes, decoration_prompt, aspect_ratio):
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

        jobs[job_id] = {
            "status": "done",
            "result_bytes": response.content
        }

    except Exception as e:
        print(f"[ERROR] Job {job_id} failed: {e}", flush=True)
        jobs[job_id] = {"status": "error", "error": str(e)}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/decorate-room", methods=["POST"])
def decorate_room():
    try:
        room_image        = request.files.get("room_image")
        decoration_prompt = request.form.get("decoration_prompt", "").strip()
        aspect_ratio      = request.form.get("aspect_ratio", "16:9")

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

        print(f"[DEBUG] Image size:    {len(image_bytes)/1024/1024:.2f} MB", flush=True)
        print(f"[DEBUG] Prompt:        {decoration_prompt}",                 flush=True)
        print(f"[DEBUG] Aspect ratio:  {aspect_ratio}",                      flush=True)
        print(f"[DEBUG] API key:       {'set' if api_key else 'MISSING'}",   flush=True)

        job_id = str(uuid.uuid4())
        jobs[job_id] = {
            "status":       "processing",
            "before_bytes": image_bytes
        }

        thread = threading.Thread(
            target=run_generation,
            args=(job_id, image_bytes, decoration_prompt, aspect_ratio),
            daemon=True
        )
        thread.start()

        print(f"[DEBUG] Job started: {job_id}", flush=True)
        return jsonify({"job_id": job_id}), 202

    except Exception as e:
        print(f"[ERROR] /decorate-room crashed: {e}", flush=True)
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@app.route("/status/<job_id>", methods=["GET"])
def check_status(job_id):
    job = jobs.get(job_id)
    if not job:
        return jsonify({"status": "not_found"}), 404
    if job["status"] == "processing":
        return jsonify({"status": "processing"}), 200
    if job["status"] == "error":
        return jsonify({"status": "error", "error": job.get("error", "Unknown error")}), 200
    return jsonify({"status": "done"}), 200


@app.route("/result/<job_id>", methods=["GET"])
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


@app.route("/before/<job_id>", methods=["GET"])
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


# ── REVIEWS ROUTES ────────────────────────────────────────────
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

        conn = sqlite3.connect("reviews.db")
        c    = conn.cursor()
        c.execute(
            "INSERT INTO reviews (name, rating, comment) VALUES (?, ?, ?)",
            (name, rating, comment)
        )
        conn.commit()
        conn.close()

        return jsonify({"success": True}), 201

    except Exception as e:
        print(f"[ERROR] /submit-review: {e}", flush=True)
        return jsonify({"error": "Failed to save review"}), 500


@app.route("/get-reviews", methods=["GET"])
def get_reviews():
    try:
        conn = sqlite3.connect("reviews.db")
        c    = conn.cursor()
        c.execute(
            "SELECT name, rating, comment, created_at FROM reviews ORDER BY created_at DESC LIMIT 20"
        )
        rows = c.fetchall()
        conn.close()

        reviews = [
            {"name": r[0], "rating": r[1], "comment": r[2], "created_at": r[3]}
            for r in rows
        ]
        return jsonify({"reviews": reviews}), 200

    except Exception as e:
        print(f"[ERROR] /get-reviews: {e}", flush=True)
        return jsonify({"error": "Failed to fetch reviews"}), 500


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Route not found"}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
