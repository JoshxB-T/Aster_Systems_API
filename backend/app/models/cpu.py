from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.product import Product

from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class CPU(Base):
    __tablename__ = "cpu"
    
    product_id: Mapped[int] = mapped_column(
        ForeignKey("product.id"),
        primary_key=True
    )

    core_count: Mapped[int] = mapped_column(nullable=False)
    
    core_clock: Mapped[Decimal] = mapped_column(
        Numeric(4, 2),
        nullable=False
    )

    boost_clock: Mapped[Decimal] = mapped_column(
        Numeric(4, 2),
        nullable=True
    )

    microarchitecture: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    tdp: Mapped[int] = mapped_column(nullable=False)
    
    graphics: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    product: Mapped["Product"] = relationship()
