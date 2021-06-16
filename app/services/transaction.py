# from app.services import get_shop_db
from typing import Any
from app.api import deps
from fastapi.param_functions import Depends
from app import crud,schemas
from app.core import config
from app.core.messages import message
# from . import get_user_db, get_shop_db, get_style_db
# import app.services.get_user_db
class TransactionService:
    def __init__(self,user_db = Depends(deps.get_user_db),shop_db=Depends(deps.get_shop_db),style_db = Depends(deps.get_style_db)) -> None:
        self.user_db = user_db
        self.shop_db = shop_db
        self.style_db = style_db

    async def create_transaction(self,user,shop,style ,db:Any):
        order = schemas.TransactionIn(
            user_id = user.id,
            shop_id = shop.id,
            style_id = style.id,
            transaction_id = 12345,
            transaction_amt = style.style_price
        )
        
        message.Json(order,'Genrated Order')
        return await crud.transaction.create(db=db,obj_in=order)

transaction = TransactionService()