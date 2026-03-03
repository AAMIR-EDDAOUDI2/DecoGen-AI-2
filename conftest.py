"""Pytest configuration and shared fixtures"""

import pytest
from PIL import Image
from io import BytesIO


@pytest.fixture(scope="session")
def sample_image_data():
    """Create sample image data for testing"""
    img = Image.new('RGB', (512, 384), color=(128, 128, 128))
    # Add some simple patterns to make it more realistic
    for x in range(0, 512, 50):
        for y in range(0, 384, 50):
            # Create a simple grid pattern
            color = (200, 200, 200) if (x + y) % 100 == 0 else (100, 100, 100)
            for i in range(10):
                for j in range(10):
                    if x + i < 512 and y + j < 384:
                        img.putpixel((x + i, y + j), color)
    
    img_bytes = BytesIO()
    img.save(img_bytes, format='JPEG', quality=85)
    img_bytes.seek(0)
    return img_bytes.getvalue()


@pytest.fixture
def mock_api_response():
    """Standard mock API response for successful decoration"""
    return {
        "id": "test_request_123",
        "polling_url": "https://api.bfl.ai/v1/get_result"
    }


@pytest.fixture
def mock_polling_response():
    """Standard mock polling response for completed generation"""
    return {
        "status": "Ready",
        "result": {
            "sample": "https://cdn.bfl.ai/generated_image_123.jpg"
        }
    }