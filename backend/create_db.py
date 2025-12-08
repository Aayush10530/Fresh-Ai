import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

load_dotenv()

# Get URL but switch dbname to 'postgres' to connect for creation
# Assumes format: postgresql://user:pass@host:port/dbname
base_url = os.getenv("DATABASE_URL")
# extremely hacky string replace strictly for this task
# authenticating against 'postgres' db which always exists
url_for_creation = base_url.replace("/freshai", "/postgres")

# Parse params roughly (or just pass to psycopg2)
# We'll parse manually to be safe for psycopg2 connection string
# actually psycopg2.connect accepts the URL directly in newer versions, or we can use the URL string.
# Let's try passing the DSN.

try:
    conn = psycopg2.connect(url_for_creation)
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Check if exists first
    cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'freshai'")
    exists = cursor.fetchone()
    if not exists:
        print("Creating database freshai...")
        cursor.execute("CREATE DATABASE freshai")
        print("Database created successfully!")
    else:
        print("Database freshai already exists.")
        
    cursor.close()
    conn.close()
except Exception as e:
    print(f"Error creating database: {e}")
