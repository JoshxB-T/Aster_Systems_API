import csv
from decimal import Decimal, InvalidOperation
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

RAW_PATH = (
    BASE_DIR
    / "data"
    / "pc_parts"
    / "raw"
    / "gpu.csv"
)

CLEAN_PATH = (
    BASE_DIR
    / "data"
    / "pc_parts"
    / "clean"
    / "gpu.csv"
)

IDENTITY_FIELDS = (
    "name",
    "chipset",
    "memory",
    "core_clock",
    "boost_clock",
    "color",
    "length",
)

def parse_price(value: str) -> Decimal | None:
    value = value.strip()

    if not value:
        return None

    try:
        return Decimal(value)
    except InvalidOperation:
        return None

def clean_gpus() -> None:
    products = {}

    rows_read = 0
    rows_skipped = 0

    with RAW_PATH.open(
        "r",
        encoding="utf-8",
        newline="",
    ) as f:
        reader = csv.DictReader(f)

        for row in reader:
            rows_read += 1

            # Required fields
            name = row["name"].strip()
            chipset = row["chipset"].strip()
            memory = row["memory"].strip()

            if not name or not chipset or not memory:
                rows_skipped += 1
                continue

            # Normalize optional fields.
            for field in IDENTITY_FIELDS:
                row[field] = row[field].strip()

            price = parse_price(row["price"])

            key = tuple(
                row[field]
                for field in IDENTITY_FIELDS
            )

            existing = products.get(key)

            if existing is None:
                products[key] = row
                continue

            existing_price = parse_price(existing["price"])

            # Keep the record with the lowest available price.
            #
            # Cases:
            #   existing=None, new=price -> use new
            #   existing=price, new=None -> keep existing
            #   both prices -> keep lower
            #   both None -> keep existing
            if existing_price is None and price is not None:
                products[key] = row
            elif (
                existing_price is not None
                and price is not None
                and price < existing_price
            ):
                products[key] = row

    CLEAN_PATH.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    fieldnames = [
        "name",
        "price",
        "chipset",
        "memory",
        "core_clock",
        "boost_clock",
        "color",
        "length",
    ]

    with CLEAN_PATH.open(
        "w",
        encoding="utf-8",
        newline="",
    ) as f:
        writer = csv.DictWriter(
            f,
            fieldnames=fieldnames,
        )

        writer.writeheader()

        for row in products.values():
            writer.writerow({
                field: row[field]
                for field in fieldnames
            })

    print(f"Rows read:            {rows_read}")
    print(f"Rows kept:            {len(products)}")
    print(f"Rows skipped:         {rows_skipped}")
    print(f"Duplicates removed:   {rows_read - rows_skipped - len(products)}")
    print(f"Output:               {CLEAN_PATH}")

if __name__ == "__main__":
    clean_gpus()