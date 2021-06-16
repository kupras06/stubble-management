from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException, File, UploadFile
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr

from app import crud, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email
from . import get_shop_db
router = APIRouter()


@router.get('/',response_model=List[schemas.ShopModel])
async def get_all_shops(
    db : Any = Depends(get_shop_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.user.UserBase = Depends(deps.get_current_shop_user)
    ) -> List[schemas.ShopModel]:

    shops = await crud.shop.get_multi(db,skip=skip,limit=limit)
    return shops

@router.get("/", response_model=List[schemas.ShopModel])
async def get_user_shops(
    db: Any = Depends(get_shop_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.user.UserBase = Depends(deps.get_current_shop_user),
) -> Any:
    """
    Retrieve User Shops.
    """
    shops = await crud.shop.get_multi(db, skip=skip, limit=limit)
    return shops


@router.post("/", response_model=schemas.shops.ShopModel)
async def create_shop_user(
    *,
    db: Any = Depends(get_shop_db),
    user_in: schemas.ShopBase,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Add a new Shop.
    """
   
    shop = await crud.shop.create(db, obj_in=user_in)
   
    return shop

from app.helpers import mongo_helper
@router.get("/{shop_id}", response_model=schemas.ShopModel)
async def get_user_shop_by_id(
    shop_id: str,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_user),
    db: Any = Depends(get_shop_db),
) -> Any:
    """
    Get a specific user by id.
    """
    shop = await crud.shop.get(db, {'_id':mongo_helper.str_to_bson(shop_id)})
   
    return schemas.ShopModel(**shop)
# import shutil
# from google.cloud import storage
# from firebase import firebase
# import os

@router.put("/{shop_id}", response_model=schemas.UserBase)
async def update_shop_by_id(
    *,
    db: Any = Depends(get_shop_db),
    shop_id: str,
    user_in: schemas.UserUpdate,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a Shop Details.
    """
    user = crud.shop.get(db, id=shop_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    user = await crud.shop.update(db, db_obj=user, obj_in=user_in)
    return user



# @router.post("/image")
# async def upload_shop_image(file : UploadFile = File(...)):

#     with open(file.filename,'wb') as buffer :
#         shutil.copyfileobj(file.file,buffer)
#     os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./firebas-config.json"
#     # firebase = firebase.FirebaseApplication('<your firebase database path>')
#     client = storage.Client()
#     bucket = client.get_bucket('buddy-4de85.appspot.com')
#     # posting to firebase storage
#     imageBlob = bucket.blob("/")
#     # imagePath = [os.path.join(self.path,f) for f in os.listdir(self.path)]
#     imagePath = file.filename
#     imageBlob = bucket.blob(file.filename)
#     imageBlob.upload_from_filename(imagePath)
#     # print(imageB)
#     return {"filename":file.filename}