from sqlmodel import Session, select
from backend.database import engine
from backend.models import User
import sys

def create_admin(email: str):
    with Session(engine) as session:
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()
        
        if not user:
            print(f"User with email {email} not found.")
            return
        
        user.is_superuser = True
        session.add(user)
        session.commit()
        session.refresh(user)
        print(f"User {email} is now an admin.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python create_admin.py <email>")
        # Default for convenience during dev if no arg provided
        # You can change this to your test email
        email = input("Enter email to promote to admin: ")
        create_admin(email)
    else:
        create_admin(sys.argv[1])
