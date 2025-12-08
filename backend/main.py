from fastapi import FastAPI
from sqlmodel import Session, select
from dotenv import load_dotenv
import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from . import auth, orders
from .database import engine, create_db_and_tables

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI(title="FreshAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

app.include_router(orders.router)

from fastapi import UploadFile, File
from .ai_service import analyze_image_bytes

@app.post("/ai/analyze")
async def analyze_laundry(file: UploadFile = File(...)):
    contents = await file.read()
    result = analyze_image_bytes(contents)
    return result

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Welcome to FreshAI Backend"}

@app.get("/ping")
def ping():
    return {"status": "pong"}

@app.get("/db-check")
def check_db():
    print(f"Endpoint DEBUG: Checking DB with URL: {engine.url}")
    try:
        with Session(engine) as session:
            print("Endpoint DEBUG: Session created")
            # Try a simple query
            session.exec(select(1))
            print("Endpoint DEBUG: Query executed")
        return {"status": "connected", "database": "PostgreSQL"}
    except Exception as e:
        print(f"Endpoint DEBUG: Error {e}")
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
