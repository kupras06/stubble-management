from fastapi import FastAPI, Depends
from starlette.requests import Request
import uvicorn

from app.api.routers.users import router as user_router
from app.api.routers.auth import auth_router
from app.core import config
# from app.core.auth import get_current_active_user
# from app import tasks
from app.api import deps

app = FastAPI(
    title=config.settings.PROJECT_NAME, docs_url="/docs", openapi_url="/api"
)


# @app.middleware("http")
# async def db_session_middleware(request: Request, call_next):
#     request.state.db = SessionLocal()
#     response = await call_next(request)
#     request.state.db.close()
#     return response


@app.get("/")
async def root():
    return {"message": "Hello World"}

# Routers
app.include_router(
    user_router,
    prefix="/api",
    tags=["users"],
    dependencies=[Depends(deps.get_current_active_user)],
)
app.include_router(auth_router, prefix="/api", tags=["auth"])

# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
