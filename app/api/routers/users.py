
from pprint import pprint
from app.core.security import get_password_hash,verify_password
from app.schemas import transaction, user
from app.core.messages import message
from typing import Any, List
from app.helpers import mongo_helper
from fastapi import APIRouter, Depends, HTTPException
from app import crud, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email
from . import get_user_db

router = APIRouter()


@router.get("/", response_model=List[schemas.user.UserBase])
async def read_users(
    db: Any = Depends(get_user_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve users.
    """
    users = await crud.user.get_multi(db, skip=skip, limit=limit)
    
    # print(db)
    return users

@router.post("/", response_model=schemas.user.UserBase)
async def create_user(
    *,
    db: Any = Depends(get_user_db),
    user_in: schemas.user.UserSignUp,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new user.
    """
    # pprint.pprint(user_in)
    # if 
    user = await crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = await crud.user.create(db, obj_in=user_in)
    if settings.EMAILS_ENABLED and user_in.email:
        send_new_account_email(
            email_to=user_in.email, username=user_in.email, password=user_in.password
        )
    return user


@router.put("/me", response_model=schemas.user.UserModel)
async def update_user_me(
    *,
    db: Any = Depends(get_user_db),
    user_in : schemas.UserUpdate,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own user.
    """
    
    db_obj = current_user
    user = await crud.user.update(db,db_obj=db_obj,obj_in=user_in)
    return user


@router.put("/password/me")
async def update_user_me(
    *,
    db: Any = Depends(get_user_db),
    user_in : schemas.user.UserUpdatePassWord,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own user.
    """
    hashed_password = get_password_hash(user_in.old_password)
    print(hashed_password,'\n',current_user.hashed_password)
    if not verify_password(user_in.old_password,current_user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail="The Old password did not match",
        )
    data = {}
    data['hashed_password'] = get_password_hash(user_in.new_password)
    await db.update_one({'_id':current_user.id},{'$set' : {**data}})
    user = db.find_one({'_id':current_user.id})
    return {'message':'Success'}

@router.get("/me", response_model=schemas.user.UserModel)
def read_user_me(
    db: Any = Depends(get_user_db),
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.post("/open", response_model=schemas.user.UserModel)
async def create_user_open(
    *,
    db: Any = Depends(get_user_db),
    user : schemas.user.UserSignUp
) -> Any:
    """
    Create new user without the need to be logged in.
    """
    userExist = await crud.user.get_by_email(db, email=user.email)
    if userExist:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system",
        )

    user = await crud.user.create(db, obj_in=user)
    return user


@router.get("/{user_id}", response_model=schemas.user.UserModel)
async def read_user_by_id(
    user_id: str,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_user),
    db: Any = Depends(get_user_db),
) -> Any:
    """
    Get a specific user by id.
    """
    user = await crud.user.get(db, {'_id' : mongo_helper.str_to_bson(user_id)})
    message.Json(user)
    if user == current_user:
        return user
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return user


@router.put("/{user_id}", response_model=schemas.user.UserModel)
async def update_user(
    *,
    db: Any = Depends(get_user_db),
    user_id: str,
    user_in: schemas.UserUpdate,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a user.
    """
    user = await crud.user.get(db, id=mongo_helper.str_to_bson(user_id))
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    message.Json(user,'UPDATE BY ID')
    user = await crud.user.update(db, db_obj=schemas.user.UserModel(**user), obj_in=user_in)
    return user

import uuid
@router.post("/order" , tags=['Transactions']) #response_model=schemas.TransactionModel)
async def create_user_order(
    *,
    db: Any = Depends(deps.get_db),
    order_in : schemas.transaction.TransactionBase,
    current_user: schemas.user.UserModel = Depends(deps.get_current_user),
) -> Any:
    """
    Create new user order
    """
    if mongo_helper.str_to_bson( order_in.user_id) != current_user.id:
        raise HTTPException(
            status_code=400,
            detail="The user not authorized for this transaction",
        )
    # id = uuid.uuid4()
    transaction = await crud.transaction.create(db=db.Transactions,obj_in=schemas.TransactionIn(**order_in.dict()))
    # message.Json(transaction)
    # 
    res = {'message':'Done'}
    return transaction