import os
import io
import requests
from flask import Flask, request, send_from_directory, jsonify, send_file
from room_decorator import RoomDecoratorApp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="")


def get_decorator():
    api_key = os.getenv("BFL_API_KEY")
    if not api_key:
        return None
    return RoomDecoratorApp(api_key)


@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/decorate-room", methods=["POST"])
def decorate_room():
    try:
        room_image = request.files.get("room_image")
        decoration_prompt = request.form.get("decoration_prompt", "").strip()
        aspect_ratio = request.form.get("aspect_ratio", "16:9")

        if not room_image:
            return jsonify({"error": "No image uploaded"}), 400
        if not decoration_prompt:
            return jsonify({"error": "No style description provided"}), 400

        decorator = get_decorator()
        if not decorator:
            return jsonify({"error": "BFL_API_KEY not configured"}), 500

        image_bytes = room_image.read()

        result_url = decorator.decorate_room(
            room_image_bytes=image_bytes,
            decoration_prompt=decoration_prompt,
            aspect_ratio=aspect_ratio
        )

        response = requests.get(result_url, timeout=60)
        response.raise_for_status()

        return send_file(
            io.BytesIO(response.content),
            mimetype="image/jpeg",
            as_attachment=False
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
