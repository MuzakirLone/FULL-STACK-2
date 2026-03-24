import pytest
from app import app, orders


@pytest.fixture(autouse=True)
def reset_orders():
    """Reset in-memory orders before each test."""
    orders.clear()
    orders.update({
        101: {"id": 101, "customer_id": 1, "item": "Laptop",   "status": "delivered"},
        102: {"id": 102, "customer_id": 1, "item": "Mouse",    "status": "shipped"},
        103: {"id": 103, "customer_id": 2, "item": "Keyboard", "status": "pending"},
        104: {"id": 104, "customer_id": 3, "item": "Monitor",  "status": "processing"},
    })


@pytest.fixture
def client():
    app.testing = True
    return app.test_client()


# ── Home ───────────────────────────────────────────────────────────────────
def test_home(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json["service"] == "Order Service"


# ── GET /orders ────────────────────────────────────────────────────────────
def test_get_orders(client):
    response = client.get("/orders")
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) == 4


# ── GET /orders/<id> ───────────────────────────────────────────────────────
def test_get_order_found(client):
    response = client.get("/orders/101")
    assert response.status_code == 200
    assert response.json["item"] == "Laptop"


def test_get_order_not_found(client):
    response = client.get("/orders/999")
    assert response.status_code == 404


# ── POST /orders ───────────────────────────────────────────────────────────
def test_create_order(client):
    response = client.post("/orders", json={"customer_id": 1, "item": "Headphones"})
    assert response.status_code == 201
    assert response.json["item"] == "Headphones"
    assert response.json["status"] == "pending"
    assert "id" in response.json


def test_create_order_missing_fields(client):
    response = client.post("/orders", json={"customer_id": 1})
    assert response.status_code == 400


# ── PUT /orders/<id>/status ────────────────────────────────────────────────
def test_update_order_status(client):
    response = client.put("/orders/103/status", json={"status": "shipped"})
    assert response.status_code == 200
    assert response.json["status"] == "shipped"


def test_update_order_status_invalid(client):
    response = client.put("/orders/103/status", json={"status": "flying"})
    assert response.status_code == 400


def test_update_order_status_not_found(client):
    response = client.put("/orders/999/status", json={"status": "shipped"})
    assert response.status_code == 404


# ── DELETE /orders/<id> ────────────────────────────────────────────────────
def test_delete_order(client):
    response = client.delete("/orders/101")
    assert response.status_code == 200

    get_response = client.get("/orders/101")
    assert get_response.status_code == 404


def test_delete_order_not_found(client):
    response = client.delete("/orders/999")
    assert response.status_code == 404
