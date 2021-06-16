from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder

from app import crud, helpers, schemas
from app.api import deps
from app.core.config import settings
from . import get_transaction_db
router = APIRouter()


@router.get("/", response_model=List[schemas.TransactionModel])
async def get_transactions(
    db: Any = Depends(get_transaction_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve User Shops.
    """
    transactions = await crud.transaction.get_multi(db, skip=skip, limit=limit)
    return transactions



from app.helpers import *

@router.get("/{transaction_id}", response_model=schemas.TransactionModel)
async def get_transaction_by_id(
    transaction_id: str,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_user),
    db: Any = Depends(get_transaction_db),
) -> Any:
    """
    Get a specific user by id.
    """
    transaction = await crud.transaction.get(db,{'_id': mongo_helper.str_to_bson(transaction_id)})
    return transaction


@router.put("/{transaction_id}", response_model=schemas.UserBase)
async def update_transaction_by_id(
    *,
    db: Any = Depends(get_transaction_db),
    transaction_id: str,
    user_in: schemas.TransactionUpdate,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a Shop Details.
    """
    user = crud.transaction.get(db, id=transaction_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    user = await crud.transaction.update(db, db_obj=user, obj_in=user_in)
    return user
