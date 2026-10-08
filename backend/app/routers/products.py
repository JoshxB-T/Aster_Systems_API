from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.schemas.product import (
    ProductListResponse,
    ProductResponse,
)

from app.services.product import get_products

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


def get_db():
    with SessionLocal() as session:
        yield session
        

@router.get(
    "",
    response_model=ProductListResponse,
)
def list_products(
    session: Session = Depends(get_db),
) -> ProductListResponse:
    products = get_products(session)
    
    return ProductListResponse(
        items=[
            ProductResponse.model_validate(product)
            for product in products
        ],
        total=len(products),
    )
