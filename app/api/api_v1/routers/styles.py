from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder

from app import crud, helpers, schemas
from app.api import deps
from app.core.config import settings
from . import get_style_db
router = APIRouter()


@router.get("/", response_model=List[schemas.StyleModel])
async def get_styles(
    db: Any = Depends(get_style_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve User Shops.
    """
    shops = await crud.style.get_multi(db, skip=skip, limit=limit)
    return shops


@router.post("/", response_model=schemas.shops.StyleModel)
async def create_style(
    *,
    db: Any = Depends(get_style_db),
    user_in: schemas.StyleBase,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Add a new Shop.
    """
   
    shop = await crud.style.create(db, obj_in=user_in)
   
    return shop

from app.helpers import *

@router.get("/{shop_id}", response_model=schemas.StyleModel)
async def get_style_by_id(
    shop_id: str,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_user),
    db: Any = Depends(get_style_db),
) -> Any:
    """
    Get a specific user by id.
    """
    style = await crud.style.get(db,{'_id': mongo_helper.str_to_bson(shop_id)})
    return style


@router.put("/{shop_id}", response_model=schemas.UserBase)
async def update_style_by_id(
    *,
    db: Any = Depends(get_style_db),
    shop_id: str,
    user_in: schemas.StyleUpdate,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a Shop Details.
    """
    user = crud.style.get(db, id=shop_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    user = await crud.style.update(db, db_obj=user, obj_in=user_in)
    return user
