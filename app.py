import os
import uuid
import mimetypes
from flask import Flask, request, jsonify, send_file, send_from_directory
from werkzeug.utils import secure_filename
from room_decorator import RoomDecoratorApp

# Fix MIME types for CSS/JS
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

app = Flask(__name__, static_folder='static', static_url_path='/static')
app.secret_key = 'decogen-ai-secret-key-2026'

# Configuration
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB

# Initialize room decorator
api_key = os.environ.get("BFL_API_KEY")
if not api_key:
    print("ERROR: BFL_API_KEY environment variable not set - File uploads will fail!")
    decorator_app = None
else:
    print("BFL_API_KEY loaded successfully")
    decorator_app = RoomDecoratorApp(api_key)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# === SERVE FRONTEND ===
@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve CSS, JS, images from static/ folder"""
    try:
        return send_from_directory('static', filename)
    except FileNotFoundError:
        return send_from_directory('static', 'index.html')

# === AI ROOM GENERATION API ===
@app.route('/decorate-room', methods=['POST'])
def decorate_room():
    try:
        # Check API key
        if not decorator_app:
            return jsonify({"error": "API not configured. Contact admin."}), 500

        # Check file upload
        if 'room_image' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files['room_image']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Only JPG, PNG, GIF allowed"}), 400

        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        if file_size > MAX_FILE_SIZE:
            return jsonify({"error": "File too large (max 20MB)"}), 400

        # Get form data
        decoration_prompt = request.form.get('decoration_prompt', '').strip()
        if not decoration_prompt:
            return jsonify({"error": "Enter a decoration prompt"}), 400

        aspect_ratio = request.form.get('aspect_ratio', '16:9')

        # Process image
        image_bytes = file.read()
        result_url = decorator_app.decorate_room(
            room_image_bytes=image_bytes,
            decoration_prompt=decoration_prompt,
            aspect_ratio=aspect_ratio
        )

        # Download result
        temp_id = str(uuid.uuid4())
        output_path = f"/tmp/decorated_room_{temp_id}.jpg"
        decorator_app.download_result(result_url, output_path)

        print(f"✅ Generated room saved: {output_path}")
        return send_file(
            output_path,
            mimetype='image/jpeg',
            as_attachment=False,
            download_name='my_new_room.jpg'
        )

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": f"Generation failed: {str(e)}"}), 500

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy", "api_key_loaded": decorator_app is not None})

@app.errorhandler(413)
def too_large(e):
    return jsonify({"error": "File too large"}), 413

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
