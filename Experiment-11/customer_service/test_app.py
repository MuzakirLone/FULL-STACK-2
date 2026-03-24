import pytest
from app import app, customers, orders


@pytest.fixture(autouse=True)
def reset_data():
    """Reset in-memory data before each test."""
    customers.clear()
    customers.update({
        1: {"id": 1, "name": "Alice Johnson", "email": "alice@example.com"},
        2: {"id": 2, "name": "Bob Smith",    "email": "bob@example.com"},
        3: {"id": 3, "name": "Carol White",  "email": "carol@example.com"},
    })
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
    assert response.json["service"] == "Customer Service"


# ── GET /customers ─────────────────────────────────────────────────────────
def test_get_customers(client):
    response = client.get("/customers")
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) == 3


# ── GET /customers/<id> ────────────────────────────────────────────────────
def test_get_customer_found(client):
    response = client.get("/customers/1")
    assert response.status_code == 200
    assert response.json["name"] == "Alice Johnson"


def test_get_customer_not_found(client):
    response = client.get("/customers/999")
    assert response.status_code == 404


# ── GET /customers/<id>/orders ─────────────────────────────────────────────
def test_get_customer_orders(client):
    response = client.get("/customers/1/orders")
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) == 2  # Alice has 2 orders


def test_get_customer_orders_customer_not_found(client):
    response = client.get("/customers/999/orders")
    assert response.status_code == 404


# ── POST /customers ────────────────────────────────────────────────────────
def test_create_customer(client):
    response = client.post("/customers", json={"name": "Dave Lee", "email": "dave@example.com"})
    assert response.status_code == 201
    assert response.json["name"] == "Dave Lee"
    assert response.json["email"] == "dave@example.com"
    assert "id" in response.json


def test_create_customer_missing_fields(client):
    response = client.post("/customers", json={"name": "Dave Lee"})
    assert response.status_code == 400
