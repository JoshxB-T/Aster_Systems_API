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
    limit: int
    offset: int


class CPUDetailsResponse(BaseModel):
    core_count: int
    core_clock: Decimal
    boost_clock: Decimal | None
    microarchitecture: str
    tdp: int
    graphics: str | None
    
    model_config = {
        "from_attributes": True
    }


class GPUDetailsResponse(BaseModel):
    chipset: str
    memory: Decimal
    core_clock: int | None
    boost_clock: int | None
    color: str | None
    length: int | None
    
    model_config = {
        "from_attributes": True
    }


class ProductDetailResponse(ProductResponse):
    details: CPUDetailsResponse | GPUDetailsResponse | None
