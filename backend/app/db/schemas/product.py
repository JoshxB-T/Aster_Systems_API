from typing import override
from sqlalchemy import ForeignKey
from sqlalchemy import String, Float
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__: str = "product"

    id: Mapped[int] = mapped_column(primary_key=True)
    sku: Mapped[str] = mapped_column(String(16), unique=True)
    name: Mapped[str] = mapped_column(String(128))
    brand: Mapped[str] = mapped_column(String(64))
    description: Mapped[str] = mapped_column(String(512))
    unit_price: Mapped[float] = mapped_column(Float)
    active: Mapped[str] = mapped_column(String(64))
    #created_at: Mapped[str] = mapped_column(String(64))
    #updated_at: Mapped[str] = mapped_column(String(64))
    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))

    @override
    def __repr__(self) -> str:
        return f"Product(id={self.id}, sku={self.sku}, name={self.name}, description={self.description}, unit_price={self.unit_price}, active={self.active})"
