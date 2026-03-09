import os
import uuid
import mimetypes
from flask import Flask, request, jsonify, send_file, send_from_directory
from werkzeug.utils import secure_filename
from room_decorator import RoomDecoratorApp

# Ensure Windows/Linux servers don't mess up the file types
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

app = Flask(__name__, static_folder='dist')
app.secret_key = 'your-secret-key-change-this' # Change this in production

# Configuration
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 20 * 1024 * 1024 # 20MB

# Initialize the room decorator
api_key = os.environ.get("BFL_API_KEY")
if not api_key:
    print("Warning: BFL_API_KEY environment variable not set")
    decorator_app = None
else:
    decorator_app = RoomDecoratorApp(api_key)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- FRONTEND ROUTES ---

# Explicitly serve the assets folder (this fixes the blank screen!)
@app.route('/assets/<path:filename>')
def serve_assets(filename):
    assets_dir = os.path.join(app.static_folder, 'assets')
    response = send_from_directory(assets_dir, filename)
    
    # Force the correct MIME type for javascript and css
    if filename.endswith('.js'):
        response.headers['Content-Type'] = 'application/javascript'
    elif filename.endswith('.css'):
        response.headers['Content-Type'] = 'text/css'
        
    return response

# Catch-all route for the React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        response = send_from_directory(app.static_folder, path)
        
        # Force the correct MIME type for javascript and css outside assets folder
        if path.endswith('.js'):
            response.headers['Content-Type'] = 'application/javascript'
        elif path.endswith('.css'):
            response.headers['Content-Type'] = 'text/css'
            
        return response
    else:
        return send_from_directory(app.static_folder, 'index.html')

# --- API ROUTES ---

@app.route('/decorate-room', methods=['POST'])
def decorate_room_endpoint():
    try:
        if not decorator_app:
            return jsonify({"error": "API key not configured."}), 500

        if 'room_image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        file = request.files['room_image']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type."}), 400

        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)

        if file_size > MAX_FILE_SIZE:
            return jsonify({"error": "File too large. Maximum size is 20MB."}), 400

        decoration_prompt = request.form.get('decoration_prompt', '').strip()
        if not decoration_prompt:
            return jsonify({"error": "Please provide a decoration prompt"}), 400

        aspect_ratio = request.form.get('aspect_ratio', '16:9')
        image_bytes = file.read()

        result_url = decorator_app.decorate_room(
            room_image_bytes=image_bytes,
            decoration_prompt=decoration_prompt,
            aspect_ratio=aspect_ratio
        )

        temp_id = str(uuid.uuid4())
        output_path = f"/tmp/decorated_room_{temp_id}.jpg"
        decorator_app.download_result(result_url, output_path)

        return send_file(output_path, as_attachment=True, download_name='decorated_room.jpg')

    except Exception as e:
        print(f"Error processing decoration: {str(e)}")
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

@app.route('/styles')
def get_decoration_styles():
    styles = {
        "modern_minimalist": "Add modern minimalist furniture...",
        "cozy_living": "Transform this into a cozy living room...",
        "victorian_elegant": "Add elegant Victorian-style furniture...",
        "modern_office": "Create a modern office space...",
        "bohemian": "Add bohemian decor...",
        "scandinavian": "Transform this room into a Scandinavian style...",
        "industrial": "Change the style to industrial...",
        "mediterranean": "Convert to a Mediterranean style..."
    }
    return jsonify(styles)

@app.errorhandler(413)
def too_large(e):
    return jsonify({"error": "File too large"}), 413

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
