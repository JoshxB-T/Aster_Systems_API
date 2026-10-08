from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.models.product import Product


def get_products(session: Session) -> list[Product]:
    statement = (
        select(Product)
        .options(joinedload(Product.category))
        .order_by(Product.id)
    )

    return list(session.scalars(statement).all())