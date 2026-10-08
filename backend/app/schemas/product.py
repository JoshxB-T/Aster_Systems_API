from decimal import Decimal

from pydantic import BaseModel


class CategoryResponse(BaseModel):
    id: int
    name: str

    model_config = {
        "from_attributes": True
    }
    

class ProductResponse(BaseModel):
    id: int
    name: str
    unit_price: Decimal | None
    active: bool
    category: CategoryResponse

    model_config = {
        "from_attributes": True
    }
    

class ProductListResponse(BaseModel):
    items: list[ProductResponse]
    total: int
