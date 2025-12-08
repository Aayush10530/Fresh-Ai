import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_create_order():
    # 1. Login to get token
    login_data = {
        "email": "debug_user_v2@example.com",
        "password": "password123"
    }
    
    # Try to login, if fails, simulate signup first
    print("Attempting login...")
    # Fix: Use data= for Form URL Encoded
    response = requests.post(f"{BASE_URL}/auth/login", data={
        "username": "debug_user_v2@example.com",
        "password": "password123"
    })
    
    if response.status_code != 200:
        print(f"Login failed: {response.text}. Attempting signup...")
        signup_data = {
            "email": "debug_user_v2@example.com",
            "password": "password123",
            "full_name": "Debug User"
        }
        resp_signup = requests.post(f"{BASE_URL}/auth/signup", json=signup_data)
        if resp_signup.status_code != 200:
            print(f"Signup failed: {resp_signup.text}")
            return
        # Login again
        response = requests.post(f"{BASE_URL}/auth/login", data={
            "username": "debug_user_v2@example.com",
            "password": "password123"
        })
    
    if response.status_code != 200:
        print(f"Login failed: {response.text}")
        return

    token = response.json().get("access_token")
    print("Login successful. Got token.")
    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    # 2. Create Order
    # Exact payload structure from Schedule.tsx
    order_payload = {
        "service": "Wash & Fold",
        "address": "123 Test St",
        "time_slot": "8:00 AM - 10:00 AM", 
        "notes": "API Debug Order",
        "pickup_date": "2025-12-08T10:00:00.000Z",
        "items_count": 0
    }
    
    print("\nSending POST /orders/ with payload:")
    print(json.dumps(order_payload, indent=2))
    
    resp_order = requests.post(
        f"{BASE_URL}/orders/",
        json=order_payload,
        headers=headers
    )
    
    print(f"\nResponse Code: {resp_order.status_code}")
    print(f"Response Body: {resp_order.text}")

if __name__ == "__main__":
    test_create_order()
