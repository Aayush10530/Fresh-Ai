from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlmodel import Session, select
from .database import get_session
from .models import Order, OrderCreate, OrderRead, User
from .auth import get_current_user
from .emails import send_order_confirmation, send_status_update

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=OrderRead)
def create_order(
    order: OrderCreate, 
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    db_order = Order.from_orm(order)
    db_order.user_id = current_user.id
    session.add(db_order)
    session.commit()
    session.refresh(db_order)
    
    # Send confirmation email
    background_tasks.add_task(
        send_order_confirmation, 
        current_user.email, 
        db_order.id, 
        db_order.pickup_date.strftime("%Y-%m-%d")
    )
    
    return db_order

@router.get("/", response_model=List[OrderRead])
def read_orders(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    statement = select(Order).where(Order.user_id == current_user.id).order_by(Order.created_at.desc())
    orders = session.exec(statement).all()
    return orders

@router.get("/{order_id}", response_model=OrderRead)
def read_order(
    order_id: str, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this order")
    return order

@router.get("/admin/all", response_model=List[OrderRead])
def read_all_orders(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(Order).order_by(Order.created_at.desc())
    orders = session.exec(statement).all()
    return orders

@router.patch("/{order_id}/status", response_model=OrderRead)
def update_order_status(
    order_id: str,
    status: str,
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    order.status = status
    session.add(order)
    session.commit()
    session.refresh(order)
    
    # Get user email
    user = session.get(User, order.user_id)
    if user:
         background_tasks.add_task(
            send_status_update, 
            user.email, 
            order.id, 
            status
        )
    
    return order
