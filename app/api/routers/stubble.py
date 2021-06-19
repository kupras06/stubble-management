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
    # pprint.pprint(user_in)
    # if
    cloudinary.config(
        cloud_name="dokwogzay",
        api_key="788945125166481",
        api_secret="bIRfDum8e45WwrDjglrJq8E7uJI"
    )

    filename = os.path.splitext(file.filename)[0]
    API_ENV = 'cloudinary://788945125166481:bIRfDum8e45WwrDjglrJq8E7uJI@dokwogzay'
    # default_app = firebase_admin.initialize_app()
    temp_file = await file.read()
    res = cloudinary.uploader.upload(temp_file,
                                     folder="/Stubbler",
                                     public_id=filename,
                                     overwrite=True,
                                     resource_type="image")
    return res['secure_url']
  