from datetime import datetime
from sqlmodel import Session, select
from backend.database import engine
from backend.models import Order, User

def create_debug_order():
    with Session(engine) as session:
        # Get first user
        user = session.exec(select(User)).first()
        if not user:
            print("No users found to create order for.")
            return

        print(f"Creating order for User: {user.email}")
        
        # Create order object
        new_order = Order(
            service="Wash & Fold",
            pickup_date=datetime.utcnow(),
            time_slot="8:00 AM - 10:00 AM",
            address="123 Test St",
            notes="Debug order",
            amount=25.0,
            items_count=10,
            user_id=user.id,
            status="Pending"
        )
        
        session.add(new_order)
        session.commit()
        session.refresh(new_order)
        print(f"Order created successfully! ID: {new_order.id}")
        
        # Verify it exists
        orders = session.exec(select(Order)).all()
        print(f"Total Orders now: {len(orders)}")

if __name__ == "__main__":
    create_debug_order()
