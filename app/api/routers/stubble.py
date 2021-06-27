from app.core.config import settings
from fastapi.datastructures import UploadFile
from fastapi.param_functions import File
from app import crud, schemas
from fastapi import APIRouter, Depends, File, UploadFile
from app.crud import stubble
from typing import Any
from app.api import deps
from . import get_stubble_db
import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from app.helpers import mongo_helper
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


@router.get('/mine')
async def get_user_stubble(
    db: Any = Depends(get_stubble_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.user.UserBase = Depends(deps.get_current_user),
) -> Any:
    """
    Retrieve Stubbles.
    """
    stubble = await crud.stubble.get_multi(db, doc={'owner':str(current_user.id)},skip=skip, limit=limit)
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

from PIL import Image
from io import BytesIO
@router.post("/upload")
async def upload_image(
    *,
    db: Any = Depends(get_stubble_db),
    file: UploadFile = File(...),
    current_user: schemas.user.UserBase = Depends(deps.get_current_user),
) -> Any:
    """
    Upload a Stubble Image
    """
    cloudinary.config(
        cloud_name=settings.CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET
    )

    filename = os.path.splitext(file.filename)[0]
    img_io = BytesIO()
    
    temp_file = await file.read()
    im = Image.open(BytesIO(temp_file))
    print(im.size)
    im = im.resize((320,400))
    im.save(img_io,'PNG')
    im = img_io.getvalue()
    res = cloudinary.uploader.upload(im,
                                     folder="/Stubbler",
                                     public_id=filename,
                                     overwrite=True,
                                     resource_type="image")
    return res['secure_url']
  

@router.get("/{stubble_id}", response_model=schemas.stubble.StubbleModel)
async def get_transaction_by_id(
    stubble_id: str,
    current_user: schemas.user.UserBase = Depends(deps.get_current_active_user),
    db: Any = Depends(get_stubble_db),
) -> Any:
    """
    Get a specific user by id.
    """
    transaction = await crud.transaction.get(db,{'_id': mongo_helper.str_to_bson(stubble_id)})
    return transaction
