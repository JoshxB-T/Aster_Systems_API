import csv

from decimal import Decimal
from pathlib import Path

from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.category import Category
from app.models.gpu import GPU
from app.models.product import Product

CSV_PATH = (
    Path(__file__).resolve().parents[3]
    / "data"
    / "pc_parts"
    / "clean"
    / "gpu.csv"
)

def get_or_create_category(
    session,
    name: str
) -> Category:
    category = session.scalar(
        select(Category).where(Category.name == name)
    )

    if not category:
        category = Category(name=name)
        session.add(category)
        session.flush()

    return category

def import_gpus() -> None:
    with SessionLocal() as session:
        try:
            category = get_or_create_category(session, "GPU")

            with CSV_PATH.open(
                mode="r",
                encoding="utf-8",
                newline=""
            ) as file:
                reader = csv.DictReader(file)

                for row in reader:
                    price = row["price"].strip()

                    unit_price = (
                        Decimal(price)
                        if price
                        else None
                    )

                    product = Product(
                        name=row["name"],
                        unit_price=unit_price,
                        category_id=category.id
                    )

                    session.add(product)
                    session.flush()

                    memory = Decimal(row["memory"])

                    core_clock = (
                        int(row["core_clock"])
                        if row["core_clock"]
                        else None
                    )

                    boost_clock = (
                        int(row["boost_clock"])
                        if row["boost_clock"]
                        else None
                    )

                    length = (
                        int(row["length"])
                        if row["length"]
                        else None
                    )

                    gpu = GPU(
                        product_id=product.id,
                        chipset=row["chipset"],
                        memory=memory,
                        core_clock=core_clock,
                        boost_clock=boost_clock,
                        color=row["color"] or None,
                        length=length
                    )

                    session.add(gpu)

            session.commit()

        except Exception:
            session.rollback()
            raise

if __name__ == "__main__":
    import_gpus()
