from sqlalchemy import text
from db.session import engine

def test_database_connection() -> None:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print(f"Database connection successful: {result.scalar()}")

def main() -> None:
    test_database_connection()

if __name__ == "__main__":
    test_database_connection()

