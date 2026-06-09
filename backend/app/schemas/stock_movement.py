from typing import override
from sqlalchemy import ForeignKey
from sqlalchemy import String, Integer
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class StockMovement(Base):
    __tablename__: str = "stock_movement"

    id: Mapped[int] = mapped_column(primary_key=True)
    quantity_change: Mapped[int] = mapped_column(Integer) 
    reason: Mapped[str] = mapped_column(String(255)) 
    created_by: Mapped[int] = mapped_column(String(64)) 
    created_at: Mapped[int] = mapped_column(String(64)) 
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id")) 
    warehouse_id: Mapped[int] = mapped_column(ForeignKey("warehouse.id")) 

    @override
    def __repr__(self) -> str:
        return f"StockMovement(id={self.id!r})"
