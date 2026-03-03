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
    
    def encode_image_from_bytes(self, image_bytes):
        """Convert image bytes to base64 string"""
        image = Image.open(BytesIO(image_bytes))
        buffered = BytesIO()
        image.save(buffered, format="JPEG")
        return base64.b64encode(buffered.getvalue()).decode()
    
    def decorate_room(self, room_image_path=None, room_image_bytes=None, decoration_prompt="", aspect_ratio="16:9"):
        """
        Edit a room image with decoration instructions
        
        Args:
            room_image_path: Path to the room image (optional if room_image_bytes provided)
            room_image_bytes: Image bytes (optional if room_image_path provided)
            decoration_prompt: Text describing the decoration changes
            aspect_ratio: Desired aspect ratio for output
        """
        
        # Encode the room image
        if room_image_path:
            encoded_image = self.encode_image(room_image_path)
        elif room_image_bytes:
            encoded_image = self.encode_image_from_bytes(room_image_bytes)
        else:
            raise ValueError("Either room_image_path or room_image_bytes must be provided")
        
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
        max_attempts = 60  # Maximum 60 seconds
        attempt = 0
        
        while attempt < max_attempts:
            time.sleep(1)  # Wait 1 second between polls
            attempt += 1
            
            try:
                result = requests.get(
                    polling_url,
                    headers={
                        'accept': 'application/json',
                        'x-key': self.api_key,
                    },
                    params={'id': request_id}
                ).json()
                
                status = result['status']
                print(f"Status: {status} (attempt {attempt})")
                
                if status == 'Ready':
                    return result['result']['sample']  # Returns the image URL
                elif status in ['Error', 'Failed']:
                    raise Exception(f"Generation failed: {result}")
                    
            except Exception as e:
                if attempt >= max_attempts:
                    raise Exception(f"Polling failed after {max_attempts} attempts: {str(e)}")
                continue
        
        raise Exception(f"Generation timed out after {max_attempts} seconds")
    
    def download_result(self, image_url, save_path):
        """Download the generated image"""
        response = requests.get(image_url)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        
        print(f"Image saved to: {save_path}")
        return save_path