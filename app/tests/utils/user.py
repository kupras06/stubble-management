from typing import Dict,Any

from fastapi.testclient import TestClient

from app import crud
from app.core.config import settings
from app.schemas.user import UserModel, UserUpdate
from app.tests.utils.utils import random_email, random_lower_string


def user_authentication_headers(
    *, client: TestClient, email: str, password: str
) -> Dict[str, str]:
    data = {"username": email, "password": password}

    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=data)
    response = r.json()
    auth_token = response["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}
    return headers


def create_random_user(db: Any) -> UserModel:
    email = random_email()
    password = random_lower_string()
    user_in = UserModel(username=email, email=email, password=password)
    user = crud.user.create(db=db, obj_in=user_in)
    return user


async def authentication_token_from_email(
    *, client: TestClient, email: str, db: Any
) -> Dict[str, str]:
    """
    Return a valid token for the user with given email.

    If the user doesn't exist it is created first.
    """
    password = random_lower_string()
    user = await crud.user.get_by_email(db, email=email)
    if not user:
        user_in_create = UserModel(username=email, email=email, password=password)
        user = crud.user.create(db, obj_in=user_in_create)
    else:
        user_in_update = UserUpdate(password=password)
        user = crud.user.update(db, db_obj=user, obj_in=user_in_update)

    return user_authentication_headers(client=client, email=email, password=password)
