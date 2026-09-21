from typing import override

from sqlalchemy import String

from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class Warehouse(Base):
    __tablename__: str = "warehouse"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(64))
    address: Mapped[str] = mapped_column(String(64))

    @override
    def __repr__(self) -> str:
        return f"Warehouse(id={self.id}, name={self.name}, address={self.address})"
