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
    sku: Mapped[str] = mapped_column(String(12), unique=True)
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(String(500))
    price: Mapped[float] = mapped_column(Float)
    active: Mapped[str] = mapped_column(String(50))

    @override
    def __repr__(self) -> str:
        return f"Product(id={self.id!r}, sku={self.sku!r}, name={self.name!r}, description={self.description!r}, price={self.price!r}, active={self.active!r})"
