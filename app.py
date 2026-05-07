import os
import io
import uuid
import threading
import requests
from flask import Flask, request, jsonify, send_file, render_template
from room_decorator import RoomDecoratorApp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="/static")

# In-memory job store: { job_id: { status, result_bytes, error, before_bytes } }
jobs = {}


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

        # ── Validation ──────────────────────────────────────────
        if not room_image:
            return jsonify({"error": "No image uploaded"}), 400
        if not decoration_prompt:
            return jsonify({"error": "Please describe a style"}), 400

        api_key = os.getenv("BFL_API_KEY")
        if not api_key:
            return jsonify({"error": "BFL_API_KEY not configured on server"}), 500

        # ── Read image once ──────────────────────────────────────
        image_bytes = room_image.read()
        if len(image_bytes) == 0:
            return jsonify({"error": "Uploaded file is empty"}), 400

        # ── Debug logs ───────────────────────────────────────────
        print(f"[DEBUG] Image size:    {len(image_bytes)/1024/1024:.2f} MB", flush=True)
        print(f"[DEBUG] Prompt:        {decoration_prompt}",                 flush=True)
        print(f"[DEBUG] Aspect ratio:  {aspect_ratio}",                      flush=True)
        print(f"[DEBUG] API key:       {'set' if api_key else 'MISSING'}",   flush=True)

        # ── Create job ───────────────────────────────────────────
        job_id = str(uuid.uuid4())
        jobs[job_id] = {
            "status":       "processing",
            "before_bytes": image_bytes   # store original for before/after
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
    # done
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
    """Serve the original uploaded image for the before/after comparison."""
    job = jobs.get(job_id)
    if not job or "before_bytes" not in job:
        return jsonify({"error": "Original not found"}), 404

    return send_file(
        io.BytesIO(job["before_bytes"]),
        mimetype="image/jpeg",
        as_attachment=False,
        download_name="decogen-original.jpg"
    )


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Route not found"}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
