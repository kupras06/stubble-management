# import jwt
# from fastapi import Depends, HTTPException, status
# from jwt import PyJWTError

# from app import schemas
# from app.crud.crud_user import get_user_by_email, create_user
# from app.core import security


# async def get_current_user(
#     db: Any = Depends(get_db), token: str = Depends(reusable_oauth2)
# ) -> schemas.user.UserBase:
#     try:
#         payload = jwt.decode(
#             token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
#         )

#         token_data = schemas.TokenPayload(**payload)
#     except jwt.JWTError as err:
#         print(err)
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Could not validate credentials",
#         )
#     except ValidationError as err:
#         print(err)
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Could not validate credentials",
#         )
#     user = await crud.user.get(db.User, document={'_id': token_data.sub})

#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     message.Success('CURRENT USER AUTHENTICATED')

#     return schemas.UserModel(**user)


# async def get_current_active_user(
#     current_user: models.User = Depends(get_current_user),
# ):
#     if not current_user.is_active:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user


# async def get_current_active_superuser(
#     current_user: models.User = Depends(get_current_user),
# ) -> models.User:
#     if not current_user.is_superuser:
#         raise HTTPException(
#             status_code=403, detail="The user doesn't have enough privileges"
#         )
#     return current_user


# def authenticate_user(db, email: str, password: str):
#     user = get_user_by_email(db, email)
#     if not user:
#         return False
#     if not security.verify_password(password, user.hashed_password):
#         return False
#     return user


# def sign_up_new_user(db, email: str, password: str):
#     user = get_user_by_email(db, email)
#     if user:
#         return False  # User already exists
#     new_user = create_user(
#         db,
#         schemas.UserCreate(
#             email=email,
#             password=password,
#             is_active=True,
#             is_superuser=False,
#         ),
#     )
#     return new_user
