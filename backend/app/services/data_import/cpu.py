import csv

from decimal import Decimal
from pathlib import Path

from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.category import Category
from app.models.cpu import CPU
from app.models.product import Product

CSV_PATH = (
    Path(__file__).resolve().parents[3]
    / "data"
    / "pc_parts"
    / "clean"
    / "cpu.csv"
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

def import_cpus() -> None:
    with SessionLocal() as session:
        try:
            category = get_or_create_category(session, "CPU")

            with CSV_PATH.open(
                mode="r",
                encoding="utf-8",
                newline=""
            ) as file:
                reader = csv.DictReader(file)
                
                for row in reader:
                    price = row["price"].strip()
                    
                    if not price:
                        raise ValueError(
                            f"Missing price for CPU: {row['name']}"
                        )

                    product = Product(
                        name=row["name"],
                        unit_price=Decimal(row["price"]),
                        category_id=category.id
                    )

                    session.add(product)
                    session.flush()

                    boost_clock= (
                        Decimal(row["boost_clock"])
                        if row["boost_clock"]
                        else None
                    )
                    
                    cpu = CPU(
                        product_id=product.id,
                        core_count=int(row["core_count"]),
                        core_clock=Decimal(row["core_clock"]),
                        boost_clock=boost_clock,
                        microarchitecture=row["microarchitecture"],
                        tdp=int(row["tdp"]),
                        graphics=row["graphics"] or None
                    )

                    session.add(cpu)
                    
            session.commit()
            
        except Exception:
            session.rollback()
            raise

if __name__ == "__main__":
    import_cpus()