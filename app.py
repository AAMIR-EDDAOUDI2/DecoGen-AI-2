import os
import io
import uuid
import threading
import requests
from flask import Flask, request, send_from_directory, jsonify, send_file
from room_decorator import RoomDecoratorApp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="")

# In-memory job store: { job_id: { status, result_bytes, error } }
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
        jobs[job_id] = {"status": "error", "error": str(e)}


@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/decorate-room", methods=["POST"])
def decorate_room():
    room_image = request.files.get("room_image")
    decoration_prompt = request.form.get("decoration_prompt", "").strip()
    aspect_ratio = request.form.get("aspect_ratio", "16:9")

    if not room_image:
        return jsonify({"error": "No image uploaded"}), 400
    if not decoration_prompt:
        return jsonify({"error": "No style description provided"}), 400

    job_id = str(uuid.uuid4())
    image_bytes = room_image.read()

    jobs[job_id] = {"status": "processing"}

    thread = threading.Thread(
        target=run_generation,
        args=(job_id, image_bytes, decoration_prompt, aspect_ratio),
        daemon=True
    )
    thread.start()

    return jsonify({"job_id": job_id}), 202


@app.route("/status/<job_id>", methods=["GET"])
def check_status(job_id):
    job = jobs.get(job_id)
    if not job:
        return jsonify({"status": "not_found"}), 404
    if job["status"] == "processing":
        return jsonify({"status": "processing"}), 200
    if job["status"] == "error":
        return jsonify({"status": "error", "error": job["error"]}), 200
    return jsonify({"status": "done"}), 200


@app.route("/result/<job_id>", methods=["GET"])
def get_result(job_id):
    job = jobs.get(job_id)
    if not job or job["status"] != "done":
        return jsonify({"error": "Result not ready"}), 404
    return send_file(
        io.BytesIO(job["result_bytes"]),
        mimetype="image/jpeg",
        as_attachment=False
    )


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
