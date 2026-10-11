from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from app.models.product import Product


def get_products(
    session: Session,
    limit: int=20,
    offset: int=0
) -> tuple[list[Product], int]:
    count_statement = select(func.count()).select_from(Product)
    total = session.scalar(count_statement) or 0

    statement = (
        select(Product)
        .options(joinedload(Product.category))
        .order_by(Product.id)
        .limit(limit)
        .offset(offset)
    )

    items = list(session.scalars(statement).all())

    return items, total


def get_product(
    session: Session,
    product_id: int
) -> Product | None:
    statement = (
        select(Product)
        .options(
            joinedload(Product.category),
            joinedload(Product.cpu),
            joinedload(Product.gpu),
        )
        .where(Product.id == product_id)
    )

    return session.scalars(statement).first()