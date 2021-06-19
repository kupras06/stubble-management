from fastapi import APIRouter
from app.api.routers import  login, users , transactions ,stubble

api_router = APIRouter()
api_router.include_router(login.router, tags=["Login"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(transactions.router, prefix="/orders", tags=["Transactions"])
api_router.include_router(stubble.router, prefix="/stubble", tags=["Stubble"])
