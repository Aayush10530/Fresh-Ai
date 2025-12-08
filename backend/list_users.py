from sqlmodel import Session, select
from backend.database import engine
from backend.models import User

def list_users():
    with Session(engine) as session:
        statement = select(User)
        users = session.exec(statement).all()
        for user in users:
            print(f"ID: {user.id}, Email: {user.email}, Is Admin: {user.is_superuser}")

if __name__ == "__main__":
    list_users()
