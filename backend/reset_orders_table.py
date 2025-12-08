from sqlmodel import SQLModel, create_engine, text
from backend.models import Order
from backend.database import engine

def reset_orders_table():
    with engine.connect() as conn:
        conn.execute(text('DROP TABLE IF EXISTS "order";'))
        conn.commit()
    
    SQLModel.metadata.create_all(engine)
    print("Orders table reset successfully.")

if __name__ == "__main__":
    reset_orders_table()
