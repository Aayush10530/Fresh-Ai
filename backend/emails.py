from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

print(f"DEBUG: Loading env from {os.path.join(os.path.dirname(__file__), '.env')}")
print(f"DEBUG: Is file there? {os.path.exists(os.path.join(os.path.dirname(__file__), '.env'))}")
print(f"DEBUG: MAIL_FROM={os.getenv('MAIL_FROM')}")

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_order_confirmation(email: EmailStr, order_id: str, pickup_date: str):
    html = f"""
    <h3>Order Confirmed!</h3>
    <p>Thank you for choosing FreshAI Laundry.</p>
    <p>Your order <b>#{order_id}</b> has been received and is scheduled for pickup on <b>{pickup_date}</b>.</p>
    <br>
    <p>You can track your order status on your dashboard.</p>
    """
    
    message = MessageSchema(
        subject=f"Order Confirmation #{order_id}",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        print(f"DEBUG_EMAIL: Successfully sent order confirmation to {email}")
    except Exception as e:
        print(f"DEBUG_EMAIL: Failed to send order confirmation to {email}. Error: {e}")

async def send_status_update(email: EmailStr, order_id: str, new_status: str):
    html = f"""
    <h3>Order Update</h3>
    <p>The status of your order <b>#{order_id}</b> has been updated.</p>
    <p>New Status: <b>{new_status}</b></p>
    <br>
    <p>Thank you for using FreshAI Laundry.</p>
    """
    
    message = MessageSchema(
        subject=f"Order Update #{order_id} - {new_status}",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        print(f"DEBUG_EMAIL: Successfully sent status update to {email}")
    except Exception as e:
        print(f"DEBUG_EMAIL: Failed to send status update to {email}. Error: {e}")
