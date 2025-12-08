
import sys
import os

# Ensure we can import backend.main
sys.path.append(os.getcwd())

from backend.main import app

print("Inspecting API Routes:")
found_ai = False
found_ping = False

for route in app.routes:
    print(f"Path: {route.path} | Name: {route.name}")
    if route.path == "/ai/analyze":
        found_ai = True
    if route.path == "/ping":
        found_ping = True

if found_ai:
    print("\nSUCCESS: /ai/analyze is registered in the app!")
else:
    print("\nFAILURE: /ai/analyze is NOT found in the app.")

if found_ping:
    print("SUCCESS: /ping is registered in the app!")
else:
    print("FAILURE: /ping is NOT found in the app.")
