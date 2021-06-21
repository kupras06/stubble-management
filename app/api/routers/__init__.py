from typing import Any
from app.api import deps
from fastapi import APIRouter, Body, Depends, HTTPException

def get_user_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.User

def get_stubble_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.Stubble

def get_transaction_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.Transactions
