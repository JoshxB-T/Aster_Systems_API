from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Query

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.schemas.product import (
    CPUDetailsResponse,
    GPUDetailsResponse,
    CategoryResponse,
    ProductDetailResponse,
    ProductListResponse,
    ProductResponse,
)

from app.services.product import get_product, get_products


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
    limit: int=Query(default=20, ge=1, le=100),
    offset: int=Query(default=0, ge=0),
    search: str | None=Query(default=None, max_length=100),
    category: Literal["CPU", "GPU"] | None=Query(default=None),
    session: Session = Depends(get_db),
) -> ProductListResponse:
    items, total = get_products(
        session,
        limit=limit,
        offset=offset,
        search=search,
        category=category
    )
    
    return ProductListResponse(
        items=[
            ProductResponse.model_validate(item)
            for item in items 
        ],
        total=total,
        limit=limit,
        offset=offset
    )


@router.get(
    "/{product_id}",
    response_model=ProductDetailResponse,
)
def get_product_by_id(
    product_id: int,
    session: Session = Depends(get_db),
) -> ProductDetailResponse:
    product = get_product(session, product_id)
    
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    if product.cpu:
        details = CPUDetailsResponse.model_validate(product.cpu)
    elif product.gpu:
        details = GPUDetailsResponse.model_validate(product.gpu)
    else:
        details = None

    return ProductDetailResponse(
        id=product.id,
        name=product.name,
        unit_price=product.unit_price,
        active=product.active,
        category=CategoryResponse.model_validate(product.category),
        details=details,
    )