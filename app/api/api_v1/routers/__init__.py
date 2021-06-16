from typing import Any
from app.api import deps
from fastapi import APIRouter, Body, Depends, HTTPException

def get_user_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.User

def get_shop_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.Shops

def get_style_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.Styles

def get_transaction_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.Transactions
