from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.product import Product

from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class GPU(Base):
    __tablename__ = "gpu"
    
    product_id: Mapped[int] = mapped_column(
        ForeignKey("product.id"),
        primary_key=True
    )

    chipset: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    memory: Mapped[int] = mapped_column(
        nullable=False
    )

    core_clock: Mapped[int] = mapped_column(
        nullable=True
    )

    boost_clock: Mapped[int] = mapped_column(
        nullable=True
    )

    color: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    length: Mapped[Decimal] = mapped_column(
        Numeric(5, 1),
        nullable=True
    )

    product: Mapped["Product"] = relationship()
