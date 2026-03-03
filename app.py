from flask import Flask, request, jsonify, send_file, render_template, flash, redirect, url_for
import uuid
import os
from werkzeug.utils import secure_filename
import tempfile
from room_decorator import RoomDecoratorApp

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this'  # Change this in production

# Configuration
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB

# Initialize the room decorator
api_key = os.environ.get("BFL_API_KEY")
if not api_key:
    print("Warning: BFL_API_KEY environment variable not set")
    decorator_app = None
else:
    decorator_app = RoomDecoratorApp(api_key)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/decorate-room', methods=['POST'])
def decorate_room_endpoint():
    try:
        # Check if API key is configured
        if not decorator_app:
            return jsonify({"error": "API key not configured. Please set BFL_API_KEY environment variable."}), 500
        
        # Check if file was uploaded
        if 'room_image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['room_image']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Check file type
        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type. Please upload PNG, JPG, JPEG, or GIF files."}), 400
        
        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({"error": "File too large. Maximum size is 20MB."}), 400
        
        # Get decoration prompt
        decoration_prompt = request.form.get('decoration_prompt', '').strip()
        if not decoration_prompt:
            return jsonify({"error": "Please provide a decoration prompt"}), 400
        
        # Get aspect ratio
        aspect_ratio = request.form.get('aspect_ratio', '16:9')
        
        # Read image bytes
        image_bytes = file.read()
        
        # Process the decoration
        result_url = decorator_app.decorate_room(
            room_image_bytes=image_bytes,
            decoration_prompt=decoration_prompt,
            aspect_ratio=aspect_ratio
        )
        
        # Download the result to a temporary file
        temp_id = str(uuid.uuid4())
        output_path = f"/tmp/decorated_room_{temp_id}.jpg"
        
        decorator_app.download_result(result_url, output_path)
        
        # Return the decorated image
        return send_file(output_path, as_attachment=True, download_name='decorated_room.jpg')
        
    except Exception as e:
        print(f"Error processing decoration: {str(e)}")
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

@app.route('/styles')
def get_decoration_styles():
    """Return predefined decoration styles"""
    styles = {
        "modern_minimalist": "Add modern minimalist furniture including a sleek white sofa, glass coffee table, and contemporary floor lamp",
        "cozy_living": "Transform this into a cozy living room with warm lighting, plush cushions, wooden furniture, and plants",
        "victorian_elegant": "Add elegant Victorian-style furniture with ornate details, rich fabrics, and classic decorative elements",
        "modern_office": "Create a modern office space with a desk, ergonomic chair, bookshelves, and professional lighting",
        "bohemian": "Add bohemian decor with colorful rugs, hanging plants, floor cushions, and artistic wall hangings",
        "scandinavian": "Transform this room into a Scandinavian style with light wood furniture, white walls, and minimalist decor",
        "industrial": "Change the style to industrial with exposed brick walls, metal furniture, and Edison bulb lighting",
        "mediterranean": "Convert to a Mediterranean style with warm colors, terracotta tiles, and rustic wooden furniture"
    }
    return jsonify(styles)

@app.errorhandler(413)
def too_large(e):
    return jsonify({"error": "File too large"}), 413

if __name__ == '__main__':
    app.run(debug=True, port=5000)