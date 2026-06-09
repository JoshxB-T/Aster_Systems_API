from typing import override
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class Warehouse(Base):
    __tablename__: str = "warehouse"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    address: Mapped[str] = mapped_column(String(50))

    @override
    def __repr__(self) -> str:
        return f"Warehouse(id={self.id!r}, name={self.name!r}, address={self.address!r})"
