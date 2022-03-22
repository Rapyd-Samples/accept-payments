from fastapi import APIRouter
from api.controllers import api

api_router = APIRouter()

api_router.include_router(api.router, prefix="/api", tags=["api"])
