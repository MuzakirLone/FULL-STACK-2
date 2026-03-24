# Experiment-11: Microservice Backend Services (Flask)

Two independent Flask microservices — a **Customer Service** and an **Order Service** — communicating over HTTP with in-memory data stores.

---

## Architecture

```
Customer Service  →  https://two3bis70067-experiment-11-customer.onrender.com
      ↓ calls
Order Service     →  https://two3bis70067-experiment-11-order.onrender.com
```

When `/customers/<id>/orders` is called, the **Customer Service internally calls the Order Service** to fetch that customer's orders, then returns a combined response.

---

## Setup (Local)

### Customer Service

```bash
cd "Experiment-11/customer_service"
pip install -r requirements.txt
python app.py
```

Runs at: `http://localhost:5001`

### Order Service

```bash
cd "Experiment-11/order_service"
pip install -r requirements.txt
python app.py
```

Runs at: `http://localhost:5002`

---

## Endpoints

### Customer Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/customers/<id>/orders` | Get customer + their orders (calls Order Service) |

### Order Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/orders/user/<user_id>` | Get all orders for a user |
| `PUT` | `/orders/<order_id>/status` | Update order status |

---

## Postman Testing Guide

> Use the live Render URLs below, or replace with `http://localhost:5001` / `http://localhost:5002` for local testing.

---

### 1. Customer Service — Health Check

- **Method:** `GET`
- **URL:** `https://two3bis70067-experiment-11-customer.onrender.com/`

**Expected Response (200):**
```json
{ "service": "Customer Service Running" }
```

---

### 2. Get Customer + Orders (Inter-Service Call)

- **Method:** `GET`
- **URL:** `https://two3bis70067-experiment-11-customer.onrender.com/customers/101/orders`

**Expected Response (200):**
```json
{
  "customer": {
    "id": 101,
    "name": "Customer-1",
    "email": "customer-1@example.com"
  },
  "orders": [
    {
      "id": 1,
      "user_id": 101,
      "order_date": "2026-02-20",
      "order_amount": 2500,
      "order_status": "Shipped",
      "items": [
        { "name": "Laptop", "quantity": 1, "price": 2000 },
        { "name": "Mouse", "quantity": 2, "price": 250 }
      ]
    },
    {
      "id": 2,
      "user_id": 101,
      "order_date": "2026-02-22",
      "order_amount": 1200,
      "order_status": "Processing",
      "items": [
        { "name": "Keyboard", "quantity": 1, "price": 1200 }
      ]
    }
  ]
}
```

Try with `102` for Customer-2:
- **URL:** `https://two3bis70067-experiment-11-customer.onrender.com/customers/102/orders`

**Error — Invalid Customer (404):**
```json
{ "error": "Customer not found" }
```

---

### 3. Order Service — Health Check

- **Method:** `GET`
- **URL:** `https://two3bis70067-experiment-11-order.onrender.com/`

**Expected Response (200):**
```json
{ "service": "Order Service Running" }
```

---

### 4. Get Orders by User

- **Method:** `GET`
- **URL:** `https://two3bis70067-experiment-11-order.onrender.com/orders/user/101`

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "user_id": 101,
    "order_date": "2026-02-20",
    "order_amount": 2500,
    "order_status": "Shipped",
    "items": [...]
  },
  ...
]
```

---

### 5. Update Order Status

- **Method:** `PUT`
- **URL:** `https://two3bis70067-experiment-11-order.onrender.com/orders/1/status`
- **Headers:** `Content-Type: application/json`
- **Body (raw → JSON):**
```json
{ "order_status": "Delivered" }
```

**Expected Response (200):**
```json
{
  "message": "Order status updated successfully",
  "order": {
    "id": 1,
    "order_status": "Delivered",
    ...
  }
}
```

**Error — Missing body field (400):**
```json
{ "error": "order_status is required" }
```

**Error — Order not found (404):**
```json
{ "error": "Order not found" }
```

---

## In-Memory Data

### Customers (IDs: 101, 102)

| ID | Name | Email |
|----|------|-------|
| 101 | Customer-1 | customer-1@example.com |
| 102 | Customer-2 | customer-2@example.com |

### Orders (IDs: 1, 2, 3)

| ID | User | Item(s) | Amount | Status |
|----|------|---------|--------|--------|
| 1 | 101 | Laptop, Mouse | ₹2500 | Shipped |
| 2 | 101 | Keyboard | ₹1200 | Processing |
| 3 | 102 | Headphones | ₹800 | Delivered |

---

## Error Reference

| Code | Reason |
|------|--------|
| `200` | Request successful |
| `400` | Missing required fields |
| `404` | Customer or Order not found |

---

## Learning Outcomes

1. **Microservice Architecture:** Understand how to split a monolithic application into independent, single-responsibility services.
2. **Inter-service Communication:** Learn how two Flask services communicate over HTTP — the Customer Service calls the Order Service to fetch orders.
3. **In-Memory Data Stores:** Use Python lists and dictionaries as lightweight in-memory databases for rapid prototyping.
4. **RESTful API Design:** Practice designing clean REST endpoints with proper HTTP methods (`GET`, `PUT`) and status codes.
5. **Cloud Deployment:** Deploy individual microservices to a cloud platform (Render) using `Procfile` and `requirements.txt`.

---

## Screenshots

### Customer Service

1. Health
<img width="1259" height="433" alt="Screenshot 2026-03-24 161148" src="https://github.com/user-attachments/assets/13ec9cab-ce36-47c8-80b4-325353de0426" />


2. Customers + Orders 1 
<img width="1242" height="831" alt="Screenshot 2026-03-24 161159" src="https://github.com/user-attachments/assets/512c030e-f468-4e4b-9bc0-8ab6315e4cd5" />

3. Customers + Orders 2
<img width="1247" height="826" alt="Screenshot 2026-03-24 161233" src="https://github.com/user-attachments/assets/18064c92-d8b5-4448-b344-f13f46506013" />


---

### Order Service

1. Order Update 1
<img width="1259" height="817" alt="Screenshot 2026-03-24 161627" src="https://github.com/user-attachments/assets/1cdf262e-dc2b-4e29-a171-f4d83d21cd3f" />

2. Order Update 2
<img width="1261" height="777" alt="Screenshot 2026-03-24 161830" src="https://github.com/user-attachments/assets/b298a814-9193-456a-880b-3b70780ebc9b" />


