from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from app.models.category import Category
from app.models.product import Product


def get_products(
    session: Session,
    limit: int=20,
    offset: int=0,
    search: str | None=None,
    category: str | None=None
) -> tuple[list[Product], int]:
    filters = []

    # Case-insensitive matching
    if search and search.strip():
        filters.append(
            Product.name.ilike(f"%{search.strip()}%")
        )

    if category:
        filters.append(
           func.upper(Category.name) == category.upper()
        ) 

    count_statement = (
        select(func.count(Product.id))
        .join(Product.category)
        .where(*filters)
    )

    total = session.scalar(count_statement) or 0

    statement = (
        select(Product)
        .join(Product.category)
        .options(joinedload(Product.category))
        .where(*filters)
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