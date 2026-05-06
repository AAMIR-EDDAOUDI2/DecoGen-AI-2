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
        image = Image.open(image_path)
        image = image.convert("RGB")
        
        max_size = 1920
        w, h = image.size
        if w > max_size or h > max_size:
            ratio = min(max_size / w, max_size / h)
            image = image.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
        
        buffered = BytesIO()
        image.save(buffered, format="JPEG", quality=90)
        return base64.b64encode(buffered.getvalue()).decode()
    
    def encode_image_from_bytes(self, image_bytes):
        image = Image.open(BytesIO(image_bytes))
        image = image.convert("RGB")
        
        max_size = 1920
        w, h = image.size
        if w > max_size or h > max_size:
            ratio = min(max_size / w, max_size / h)
            image = image.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
        
        buffered = BytesIO()
        image.save(buffered, format="JPEG", quality=90)
        return base64.b64encode(buffered.getvalue()).decode()
    
    def decorate_room(self, room_image_path=None, room_image_bytes=None, decoration_prompt="", aspect_ratio="16:9"):
        if room_image_path:
            encoded_image = self.encode_image(room_image_path)
        elif room_image_bytes:
            encoded_image = self.encode_image_from_bytes(room_image_bytes)
        else:
            raise ValueError("Either room_image_path or room_image_bytes must be provided")
        
        request_data = {
            'prompt': decoration_prompt,
            'input_image': encoded_image,
            'aspect_ratio': aspect_ratio,
            'output_format': 'jpeg',
            'safety_tolerance': 2
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
        
        return self._poll_for_result(polling_url, request_id)
    
    def _poll_for_result(self, polling_url, request_id):
        max_attempts = 120
        attempt = 0
        
        while attempt < max_attempts:
            time.sleep(1)
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
                    return result['result']['sample']
                elif status in ['Error', 'Failed']:
                    raise Exception(f"Generation failed: {result}")
                    
            except Exception as e:
                if attempt >= max_attempts:
                    raise Exception(f"Polling failed after {max_attempts} attempts: {str(e)}")
                continue
        
        raise Exception(f"Generation timed out after {max_attempts} seconds")
    
    def download_result(self, image_url, save_path):
        response = requests.get(image_url)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        
        print(f"Image saved to: {save_path}")
        return save_path
