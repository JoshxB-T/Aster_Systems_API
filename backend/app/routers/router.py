from fastapi import APIRouter

from app.routers.root import router as root_router
from app.routers.products import router as products_router

api_router = APIRouter()

api_router.include_router(root_router)
api_router.include_router(products_router)
