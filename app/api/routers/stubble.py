from app import crud,schemas
from fastapi import APIRouter, Depends , HTTPException
from app.crud import stubble
from typing import Any
from app.api import  deps
from . import get_stubble_db

router = APIRouter()
@router.get('/')
async def get_all_stubble(
    db: Any = Depends(get_stubble_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.user.UserBase = Depends(deps.get_current_user),
) -> Any:
    """
    Retrieve Stubbles.
    """
    stubble = await crud.stubble.get_multi(db, skip=skip, limit=limit)
    return stubble


@router.post("/", response_model=schemas.stubble.StubbleModel)
async def create_stubble(
    *,
    db: Any = Depends(get_stubble_db),
    user_in: schemas.stubble.StubbleModelIn,
    current_user: schemas.user.UserBase = Depends(deps.get_current_user),
) -> Any:
    """
    Create new Stubble.
    """
    # pprint.pprint(user_in)
    # if 
        
    stubble = await crud.stubble.create(db, obj_in=user_in)
    return stubble