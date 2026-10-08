from fastapi import APIRouter

from app.services.root import get_root

router = APIRouter(
    prefix="/status",
    tags=["Root"]
)

@router.get("/")
def list_root():
    return get_root()
