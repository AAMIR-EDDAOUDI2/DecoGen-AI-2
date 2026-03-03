# Room Decoration App with FLUX API

A comprehensive guide to building a room decoration application using the FLUX.1 Kontext [pro] API.

## Table of Contents

- [Overview](#overview)
- [Core Architecture](#core-architecture)
- [Complete Implementation](#complete-implementation)
- [Advanced Prompting Strategies](#advanced-prompting-strategies)
- [Web Application Integration](#web-application-integration)
- [Key Features](#key-features)
- [Important Considerations](#important-considerations)

## Overview

The FLUX.1 Kontext [pro] model, accessible via the `/flux-kontext-pro` endpoint, is specifically designed for advanced image editing capabilities, making it ideal for room decoration applications.

## Core Architecture

The room decoration app is built around a Python class that handles image encoding, API communication, and result polling.

## Complete Implementation

### Main Application Class

```python
import os
import requests
import base64
import time
from PIL import Image
from io import BytesIO

class RoomDecoratorApp:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.bfl.ai/v1/flux-kontext-pro"
        
    def encode_image(self, image_path):
        """Convert image to base64 string"""
        image = Image.open(image_path)
        buffered = BytesIO()
        image.save(buffered, format="JPEG")
        return base64.b64encode(buffered.getvalue()).decode()
    
    def decorate_room(self, room_image_path, decoration_prompt, aspect_ratio="16:9"):
        """
        Edit a room image with decoration instructions
        
        Args:
            room_image_path: Path to the room image
            decoration_prompt: Text describing the decoration changes
            aspect_ratio: Desired aspect ratio for output
        """
        
        # Encode the room image
        encoded_image = self.encode_image(room_image_path)
        
        # Submit decoration request
        request_data = {
            'prompt': decoration_prompt,
            'input_image': encoded_image,
            'aspect_ratio': aspect_ratio,
            'output_format': 'jpeg'
        }
        
        response = requests.post(
            self.base_url,
            headers={
                'accept': 'application/json',
                'x-key': self.api_key,
                'Content-Type': 'application/json',
            },
            json=request_data
        )
        
        if response.status_code != 200:
            raise Exception(f"API request failed: {response.text}")
            
        result = response.json()
        request_id = result["id"]
        polling_url = result["polling_url"]
        
        # Poll for results
        return self._poll_for_result(polling_url, request_id)
    
    def _poll_for_result(self, polling_url, request_id):
        """Poll the API until the result is ready"""
        while True:
            time.sleep(1)  # Wait 1 second between polls
            
            result = requests.get(
                polling_url,
                headers={
                    'accept': 'application/json',
                    'x-key': self.api_key,
                },
                params={'id': request_id}
            ).json()
            
            status = result['status']
            print(f"Status: {status}")
            
            if status == 'Ready':
                return result['result']['sample']  # Returns the image URL
            elif status in ['Error', 'Failed']:
                raise Exception(f"Generation failed: {result}")
    
    def download_result(self, image_url, save_path):
        """Download the generated image"""
        response = requests.get(image_url)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        
        print(f"Image saved to: {save_path}")
```

### Usage Example

```python
def main():
    # Set up your API key
    api_key = os.environ.get("BFL_API_KEY")
    if not api_key:
        raise ValueError("Please set BFL_API_KEY environment variable")
    
    app = RoomDecoratorApp(api_key)
    
    # Example decoration prompts for different scenarios
    decoration_examples = [
        "Add modern minimalist furniture including a sleek white sofa, glass coffee table, and contemporary floor lamp",
        "Transform this into a cozy living room with warm lighting, plush cushions, wooden furniture, and plants",
        "Add elegant Victorian-style furniture with ornate details, rich fabrics, and classic decorative elements",
        "Create a modern office space with a desk, ergonomic chair, bookshelves, and professional lighting",
        "Add bohemian decor with colorful rugs, hanging plants, floor cushions, and artistic wall hangings"
    ]
    
    try:
        # Decorate the room
        room_image_path = "input_room.jpg"  # Your input room image
        decoration_prompt = decoration_examples[0]  # Choose your decoration style
        
        print(f"Decorating room with: {decoration_prompt}")
        
        result_url = app.decorate_room(
            room_image_path=room_image_path,
            decoration_prompt=decoration_prompt,
            aspect_ratio="16:9"
        )
        
        # Download the result
        app.download_result(result_url, "decorated_room.jpg")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
```

## Advanced Prompting Strategies

### 1. Specific Object Addition

```python
prompts = [
    "Add a modern sectional sofa in light gray fabric positioned against the wall",
    "Place a large wooden dining table with 6 chairs in the center of the room",
    "Add built-in bookshelves along the entire back wall filled with books"
]
```

### 2. Style Transformation

```python
prompts = [
    "Transform this room into a Scandinavian style with light wood furniture, white walls, and minimalist decor",
    "Change the style to industrial with exposed brick walls, metal furniture, and Edison bulb lighting",
    "Convert to a Mediterranean style with warm colors, terracotta tiles, and rustic wooden furniture"
]
```

### 3. Controlled Edits (Maintaining Room Structure)

```python
prompts = [
    "Add furniture while maintaining the same room layout and architectural features",
    "Decorate with modern furniture while keeping the existing windows and doors unchanged",
    "Add cozy elements like rugs and cushions while preserving the room's original character"
]
```

## Web Application Integration

Here's how to integrate the room decorator into a Flask web application:

```python
from flask import Flask, request, jsonify, send_file
import uuid
import os

app = Flask(__name__)
decorator_app = RoomDecoratorApp(os.environ.get("BFL_API_KEY"))

@app.route('/decorate-room', methods=['POST'])
def decorate_room_endpoint():
    try:
        # Get uploaded image and decoration prompt
        image_file = request.files['room_image']
        decoration_prompt = request.form['decoration_prompt']
        
        # Save uploaded image temporarily
        temp_id = str(uuid.uuid4())
        input_path = f"temp_input_{temp_id}.jpg"
        output_path = f"temp_output_{temp_id}.jpg"
        
        image_file.save(input_path)
        
        # Process the decoration
        result_url = decorator_app.decorate_room(
            room_image_path=input_path,
            decoration_prompt=decoration_prompt
        )
        
        # Download and serve the result
        decorator_app.download_result(result_url, output_path)
        
        # Clean up input file
        os.remove(input_path)
        
        return send_file(output_path, as_attachment=True)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

## Key Features

Your room decoration app should include:

- **Image Upload Interface**: Allow users to upload room photos
- **Decoration Style Selection**: Provide preset decoration styles or custom prompt input
- **Preview & Download**: Show the decorated result and allow download
- **Error Handling**: Handle API limits, failed generations, and invalid inputs
- **Image Management**: Properly handle the 10-minute URL expiration by downloading images immediately

## Important Considerations

### Technical Limitations

- **Rate Limits**: Maximum 24 concurrent requests (6 for flux-kontext-max)
- **Image Expiration**: Generated images expire after 10 minutes
- **Image Size**: Input images support up to 20MB or 20 megapixels
- **Aspect Ratios**: Supports ratios from 3:7 to 7:3

### Best Practices

- **Cost Management**: Each API call consumes credits
- **Error Handling**: Implement robust error handling for API failures
- **User Experience**: Provide clear feedback during processing
- **File Management**: Clean up temporary files to prevent storage issues

---

This foundation provides everything needed to build a powerful room decoration app using the FLUX API's advanced image editing capabilities!