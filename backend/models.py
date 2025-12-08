from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)
    full_name: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    created_at: datetime
    is_superuser: bool = False

class UserLogin(SQLModel):
    email: str
    password: str

class Token(SQLModel):
    access_token: str
    token_type: str

import random
import string

def generate_order_id():
    letters = "".join(random.choices(string.ascii_uppercase, k=2))
    numbers = "".join(random.choices(string.digits, k=4))
    return f"{letters}{numbers}"

class OrderBase(SQLModel):
    service: str
    pickup_date: datetime
    time_slot: str
    address: str
    notes: Optional[str] = None
    amount: float = 0.0
    items_count: int = 0
    status: str = "Pending"

class Order(OrderBase, table=True):
    id: Optional[str] = Field(default_factory=generate_order_id, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class OrderCreate(OrderBase):
    pass

class OrderRead(OrderBase):
    id: str
    created_at: datetime
    user_id: int
