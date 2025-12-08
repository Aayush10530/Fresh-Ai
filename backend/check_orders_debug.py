from sqlmodel import Session, select
from backend.database import engine
from backend.models import Order, User

def check_orders():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        print(f"Total Users: {len(users)}")
        for user in users:
            print(f"User: {user.id} - {user.email}")
        
        orders = session.exec(select(Order)).all()
        print(f"Total Orders: {len(orders)}")
        for order in orders:
            print(f"Order ID: {order.id}, User ID: {order.user_id}, Status: {order.status}")

if __name__ == "__main__":
    check_orders()
