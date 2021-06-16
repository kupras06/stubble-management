from fastapi import APIRouter
from app.api.api_v1.routers import  login, users,shops,styles , transactions

api_router = APIRouter()
api_router.include_router(login.router, tags=["Login"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(shops.router, prefix="/shops", tags=["Shops"])
api_router.include_router(styles.router, prefix="/styles", tags=["Styles"])
api_router.include_router(transactions.router, prefix="/orders", tags=["Transactions"])
