import requests
import sys

BASE_URL = "http://localhost:8000/auth"
EMAIL = "test_user_unique@example.com"
PASSWORD = "testpassword123"

def test_signup():
    print("Testing Signup...")
    response = requests.post(f"{BASE_URL}/signup", json={
        "email": EMAIL,
        "password": PASSWORD,
        "full_name": "Test User"
    })
    if response.status_code == 200:
        print("Signup: Success")
        return True
    elif response.status_code == 400 and "Email already registered" in response.text:
         print("Signup: User already exists (OK)")
         return True
    else:
        print(f"Signup: Failed {response.status_code} - {response.text}")
        return False

def test_login():
    print("Testing Login...")
    response = requests.post(f"{BASE_URL}/login", data={
        "username": EMAIL,
        "password": PASSWORD
    })
    if response.status_code == 200:
        print(f"Login: Success - Token: {response.json().get('access_token')[:10]}...")
        return True
    else:
        print(f"Login: Failed {response.status_code} - {response.text}")
        return False

if __name__ == "__main__":
    if test_signup() and test_login():
        print("ALL TESTS PASSED")
        sys.exit(0)
    else:
        sys.exit(1)
