from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

##################################################
# Some tests may only assert the status code due
# to uncertainty in checking response json
##################################################

def test_read_bad_product_by_id():
    response = client.get("/products/0")

    assert response.status_code == 404
    assert response.json() == {"detail":"Product not found"}

    
def test_read_good_product_by_id():
    response = client.get("/products/1")
    
    assert response.status_code == 200


def test_bad_limit_parameter():
    response = client.get("/products?limit=101")

    assert response.status_code == 422


def test_bad_offset_parameter():
    response = client.get("/products?offset=-1")

    assert response.status_code == 422


def test_bad_search_parameter():
    response = client.get("/products?search=test")

    assert response.status_code == 200
    assert response.json() == {"items": [], "limit": 20, "offset": 0, "total": 0}


def test_bad_category_parameter():
    response = client.get("/products?category=HELLO")

    assert response.status_code == 422


def test_good_full_cpu_parameters():
    response = client.get("/products?limit=25&offset=0&search=AMD&category=CPU")

    assert response.status_code == 200


def test_good_full_gpu_parameters():
    response = client.get("/products?limit=30&offset=0&search=Geforce&category=GPU")

    assert response.status_code == 200