from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

# DATABASE_URL = os.getenv("DATABASE_URL")
# Hardcoded for reliability as confirmed in debugging
DATABASE_URL = "postgresql://postgres:Tazxv5567@127.0.0.1:5432/freshai"

engine = create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    # Auto-create DB logic could go here, or keep in main for simplicity of startup
    # For now, just create tables
    SQLModel.metadata.create_all(engine)
