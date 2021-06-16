from .transaction import transaction
from app.api import deps
from fastapi import Depends
from typing import Any


def get_user_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.User

def get_shop_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.Shops

def get_style_db(db : Any =  Depends(deps.get_db)):
    if db:
        yield db.Styles
