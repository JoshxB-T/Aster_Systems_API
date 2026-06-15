from typing import override

from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class Inventory(Base):
    __tablename__: str = "inventory"

    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[int] = mapped_column(Integer)
    warehouse_id: Mapped[int] = mapped_column(ForeignKey("warehouse.id"))
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))

    @override
    def __repr__(self) -> str:
        return f"Inventory(id={self.id!r}, quantity={self.quantity!r}, warehouse_id={self.warehouse_id!r}, product_id={self.product_id!r})"
