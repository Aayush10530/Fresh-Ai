from sqlmodel import Session, select
from backend.database import engine
from backend.models import User

def find_user_by_name(name: str):
    with Session(engine) as session:
        statement = select(User).where(User.full_name == name)
        users = session.exec(statement).all()
        for user in users:
            print(f"Found User -> ID: {user.id}, Email: {user.email}, Is Admin: {user.is_superuser}")

if __name__ == "__main__":
    find_user_by_name("Aayush Mishra")
