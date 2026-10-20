from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_read_bad_product_by_id():
    response = client.get("/products/0")

    assert response.status_code == 404
    assert response.json() == {"detail":"Product not found"}

    
def test_read_good_product_by_id():
    response = client.get("/products/1")
    
    # Only testing status code because first product
    # may change with order data is ingested into db
    assert response.status_code == 200


def test_bad_offset_parameter():
    response = client.get("/products/limit=20&offset=-1")

    assert response.status_code == 422
    

def test_bad_limit_parameter():
    response = client.get("/products/limit=101&offset=0")

    assert response.status_code == 422
