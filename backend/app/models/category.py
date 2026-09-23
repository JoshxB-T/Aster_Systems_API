from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.product import Product

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class Category(Base):
    __tablename__: str = "category"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    products: Mapped[list["Product"]] = relationship(
        back_populates="category"
    )
