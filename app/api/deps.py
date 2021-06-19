from typing import Generator,Any

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
import motor.motor_asyncio

from app import crud, schemas
from app.core import security
from app.core.config import settings
from app.core.messages import message
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)

async def get_db() -> Any:
    try:
        
        db = motor.motor_asyncio.AsyncIOMotorClient(settings.DB_URL)
        yield db['Stubble']
        
    finally:
        pass

def get_user_db(db : Any =  Depends(get_db)):
    if db:
        yield db.User

def get_shop_db(db : Any =  Depends(get_db)):
    if db:
        yield db.Shops

def get_style_db(db : Any =  Depends(get_db)):
    if db:
        yield db.Styles

def get_transact_db(db : Any =  Depends(get_db)):
    if db:
        yield db.Transactions



async def get_current_user(
    db: Any = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> schemas.user.UserBase:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        
        token_data = schemas.TokenPayload(**payload)
    except  jwt.JWTError as err :
        print(err)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    except  ValidationError as err :
        print(err)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = await crud.user.get(db.User, document={'_id':token_data.sub})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    message.Success('CURRENT USER AUTHENTICATED')
    
    return schemas.UserModel(**user)


def get_current_active_user(
    current_user: schemas.user.UserBase = Depends(get_current_user),
) -> schemas.user.UserBase:
    if not crud.user.is_active(current_user):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def get_current_shop_user(
    current_user: schemas.user.UserBase = Depends(get_current_user),
) -> schemas.user.UserBase:
    if get_current_active_superuser:
        return True
    if not crud.user.is_shop(current_user):
        raise HTTPException(status_code=400, detail="User Not in Owner's List")
    return current_user


def get_current_active_superuser(
    current_user: schemas.user.UserModel = Depends(get_current_user),
) -> schemas.user.UserBase:
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user
