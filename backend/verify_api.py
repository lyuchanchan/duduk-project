import os
import django
import sys

# Add backend directory to sys.path
sys.path.append('/Users/lyuchan/antigravity/duduk-project/backend')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from rest_framework.test import APIClient
from finance.models import Transaction

def run_verification():
    # Create User
    username = 'testuser'
    password = 'testpassword123'
    if not User.objects.filter(username=username).exists():
        user = User.objects.create_user(username=username, password=password)
        print(f"User {username} created.")
    else:
        user = User.objects.get(username=username)
        print(f"User {username} already exists.")

    # Initialize Client
    client = APIClient()
    client.force_authenticate(user=user)

    # Test Create Transaction
    data = {
        "category": "Food",
        "item": "Burger",
        "store": "Burger King",
        "amount": 15000,
        "memo": "Lunch",
        # "date": "2023-10-27T12:00:00Z" # Optional
    }
    response = client.post('/api/transactions/', data, format='json')
    print(f"Create Response: {response.status_code}")
    if response.status_code == 201:
        print("Create Success:", response.data)
    else:
        print("Create Failed:", response.data)

    # Test List Transactions
    response = client.get('/api/transactions/')
    print(f"List Response: {response.status_code}")
    if response.status_code == 200:
        print(f"Found {len(response.data)} transactions")
    else:
        print("List Failed:", response.data)

    # --- New Endpoints Verification ---
    print("\n--- Testing Custom Endpoints ---")

    # 1. Test Parse (Mocking AI response if needed, but here we test the endpoint)
    # Note: Real AI call requires API Key. If not set, it might fail gracefully.
    parse_data = {"text": "스타벅스 5000원"}
    response = client.post('/api/transactions/parse/', parse_data, format='json')
    print(f"Parse Response: {response.status_code}")
    if response.status_code == 200:
        print("Parse Result:", response.data)
        parsed_result = response.data
    else:
        print("Parse Failed (Expected if no API Key):", response.data)
        # Fallback for testing create
        parsed_result = {
            "category": "Cafe",
            "item": "Americano",
            "store": "Starbucks",
            "amount": 5000,
            "memo": "Parsed manually"
        }

    # 2. Test Create (using standard endpoint)
    response = client.post('/api/transactions/', parsed_result, format='json')
    print(f"Standard Create Response: {response.status_code}")
    if response.status_code == 201:
        print("Standard Create Success:", response.data)
    else:
        print("Standard Create Failed:", response.data)

    # 3. Test Coaching
    response = client.get('/api/transactions/coaching/')
    print(f"Coaching Response: {response.status_code}")
    if response.status_code == 200:
        print("Coaching Result:", response.data)
    else:
        print("Coaching Failed:", response.data)

if __name__ == "__main__":
    run_verification()
