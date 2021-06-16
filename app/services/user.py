from . import get_user_db
from typing import Any

from fastapi.param_functions import Depends
from app.schemas import transaction
from app import crud,schemas
from app.core import config,messages


class UserService():
    def __init__(self,user_db = Depends(get_user_db)) -> None:
        self.user_db = user_db
        pass
    def create_user(self,order:schemas.UserBase) -> schemas.UserModel:
        user = crud.user.create(user)
        return user

    def get_user_by_id(self,id) -> schemas.UserModel:
        user = crud.user.get()
user = UserService()