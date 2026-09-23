import csv
from decimal import Decimal, InvalidOperation
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

SOURCE_PATH = (
    BASE_DIR
    / "data"
    / "pc_parts"
    / "raw"
    / "cpu.csv"
)

OUTPUT_PATH = (
    BASE_DIR
    / "data"
    / "pc_parts"
    / "clean"
    / "cpu.csv"
)

REQUIRED_FIELDS = (
    "name",
    "price",
    "core_count",
    "core_clock",
    "microarchitecture",
    "tdp",
)

IDENTITY_FIELDS = (
    "name",
    "core_count",
    "core_clock",
    "boost_clock",
    "microarchitecture",
    "tdp",
    "graphics",
)

def clean_cpus() -> None:
    OUTPUT_PATH.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    rows_read = 0
    rows_skipped = 0
    rows_kept = 0
    duplicates_removed = 0

    normalized_rows: dict[tuple[str, ...], dict[str, str]] = {}

    with SOURCE_PATH.open(
        mode="r",
        encoding="utf-8",
        newline="",
    ) as source:

        reader = csv.DictReader(source)

        if reader.fieldnames is None:
            raise ValueError("CPU CSV has no header.")

        for line_number, row in enumerate(reader, start=2):
            rows_read += 1

            price = (row["price"] or "").strip()

            if not price:
                rows_skipped += 1
                continue

            for field in REQUIRED_FIELDS:
                value = (row[field] or "").strip()

                if not value:
                    raise ValueError(
                        f"Missing required field "
                        f"{field!r} on line {line_number}."
                    )

            try:
                Decimal(price)
                int(row["core_count"])
                Decimal(row["core_clock"])
                int(row["tdp"])
            except (InvalidOperation, ValueError) as exc:
                raise ValueError(
                    f"Invalid numeric value on "
                    f"line {line_number}: {row}"
                ) from exc

            boost_clock = (
                row["boost_clock"] or ""
            ).strip()

            if boost_clock:
                try:
                    Decimal(boost_clock)
                except InvalidOperation as exc:
                    raise ValueError(
                        f"Invalid boost_clock on "
                        f"line {line_number}: "
                        f"{boost_clock!r}"
                    ) from exc

            identity = tuple(
                (row[field] or "").strip()
                for field in IDENTITY_FIELDS
            )

            existing = normalized_rows.get(identity)

            if existing is None:
                normalized_rows[identity] = row
                continue

            existing_price = Decimal(existing["price"])
            current_price = Decimal(price)

            if current_price < existing_price:
                normalized_rows[identity] = row

            duplicates_removed += 1

    rows_kept = len(normalized_rows)

    with OUTPUT_PATH.open(
        mode="w",
        encoding="utf-8",
        newline="",
    ) as output:

        writer = csv.DictWriter(
            output,
            fieldnames=reader.fieldnames,
        )

        writer.writeheader()
        writer.writerows(normalized_rows.values())

    print(f"Rows read:            {rows_read}")
    print(f"Rows kept:            {rows_kept}")
    print(f"Rows skipped:         {rows_skipped}")
    print(f"Duplicates removed:   {duplicates_removed}")
    print(f"Output:               {OUTPUT_PATH}")

if __name__ == "__main__":
    clean_cpus()