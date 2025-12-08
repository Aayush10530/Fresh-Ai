
import requests
import io
from PIL import Image, ImageDraw

def test_ai_analyze():
    # 1. Create a dummy image (Red square = unlikely to be "stain" but good for connection test)
    # To test "stain", we might need a real image or a specific color pattern, 
    # but for now we just want to verify the PIPELINE (File upload -> Processing -> JSON return).
    
    img = Image.new('RGB', (100, 100), color = 'red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr.seek(0)
    
    url_root = "http://127.0.0.1:8000/"
    url_ai = "http://127.0.0.1:8000/ai/analyze"
    
    # Check Root
    try:
        print(f"Checking root {url_root}...")
        resp_root = requests.get(url_root)
        print(f"Root Status: {resp_root.status_code}")
    except Exception as e:
        print(f"Root check failed: {e}")
    
    url_ping = "http://127.0.0.1:8000/ping"
    
    # Check Ping
    try:
        print(f"Checking ping {url_ping}...")
        resp_ping = requests.get(url_ping)
        print(f"Ping Status: {resp_ping.status_code}")
        if resp_ping.status_code == 200:
            print("Ping successful - Server is reloading!")
        else:
            print("Ping failed - Server might be stale.")
    except Exception as e:
        print(f"Ping check failed: {e}")
    
    files = {'file': ('test.jpg', img_byte_arr, 'image/jpeg')}
    
    print(f"Sending POST request to {url_ai}...")
    try:
        response = requests.post(url_ai, files=files)
        
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("Response JSON:")
            print(response.json())
        else:
            print("Error Response:")
            print(response.text)
            
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_ai_analyze()
