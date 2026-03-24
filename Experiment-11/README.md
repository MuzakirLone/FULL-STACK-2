# Experiment-11: Microservice Backend Services (Flask)

Two independent Flask microservices — a **Customer Service** and an **Order Service** — communicating over HTTP with in-memory data stores.

---

## Architecture

```
customer_service/   →   https://experiment-11-customer-service.onrender.com
order_service/      →   https://experiment-11-order-service.onrender.com
```

---

## Setup

### Customer Service

```bash
cd "Experiment-11/customer_service"
pip install -r requirements.txt
python app.py
```

Server runs at: `https://experiment-11-customer-service.onrender.com`

### Order Service

```bash
cd "Experiment-11/order_service"
pip install -r requirements.txt
python app.py
```

Server runs at: `https://experiment-11-order-service.onrender.com`

---

## Endpoints

### Customer Service (`localhost:5001`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/customers` | Get all customers |
| `GET` | `/customers/<id>` | Get a single customer |
| `GET` | `/customers/<id>/orders` | Get all orders for a customer |
| `POST` | `/customers` | Create a new customer |

### Order Service (`localhost:5002`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders` | Get all orders |
| `GET` | `/orders/<id>` | Get a single order |
| `POST` | `/orders` | Create a new order |
| `PUT` | `/orders/<id>/status` | Update order status |
| `DELETE` | `/orders/<id>` | Delete an order |

---

## Postman Testing Guide

### 1. Get All Customers — `GET /customers`

- **Method:** `GET`
- **URL:** `https://experiment-11-customer-service.onrender.com/customers`

**Expected Response (200):**
```json
[
  { "id": 1, "name": "Alice Johnson", "email": "alice@example.com" },
  { "id": 2, "name": "Bob Smith",     "email": "bob@example.com" },
  { "id": 3, "name": "Carol White",   "email": "carol@example.com" }
]
```

---

### 2. Get Orders for a Customer — `GET /customers/<id>/orders`

- **Method:** `GET`
- **URL:** `https://experiment-11-customer-service.onrender.com/customers/1/orders`

**Expected Response (200):**
```json
[
  { "id": 101, "customer_id": 1, "item": "Laptop", "status": "delivered" },
  { "id": 102, "customer_id": 1, "item": "Mouse",  "status": "shipped" }
]
```

**Error (404):** Invalid customer ID → `{ "error": "Customer not found" }`

---

### 3. Update Order Status — `PUT /orders/<id>/status`

- **Method:** `PUT`
- **URL:** `https://experiment-11-order-service.onrender.com/orders/103/status`
- **Body:** `raw` → `JSON`
```json
{
  "status": "shipped"
}
```

**Valid statuses:** `pending`, `processing`, `shipped`, `delivered`, `cancelled`

**Expected Response (200):**
```json
{ "id": 103, "customer_id": 2, "item": "Keyboard", "status": "shipped" }
```

**Error (400):** Invalid status → `{ "error": "Invalid status. Must be one of: [...]" }`

---

### 4. Create a New Order — `POST /orders`

- **Method:** `POST`
- **URL:** `https://experiment-11-order-service.onrender.com/orders`
- **Body:** `raw` → `JSON`
```json
{
  "customer_id": 2,
  "item": "Webcam",
  "status": "pending"
}
```

**Expected Response (201):**
```json
{ "id": 105, "customer_id": 2, "item": "Webcam", "status": "pending" }
```

---

## Error Reference

| Code | Reason |
|------|--------|
| `400` | Missing required fields or invalid status value |
| `404` | Customer or Order ID not found |
| `200` | Request successful |
| `201` | Resource created successfully |

---

## Learning Outcomes

1. **Microservice Architecture:** Understand how to split a monolithic application into independent, single-responsibility services.
2. **Inter-service Communication:** Learn how two Flask services can expose REST APIs and be tested independently via Postman.
3. **In-Memory Data Stores:** Use Python dictionaries as lightweight in-memory databases for rapid prototyping.
4. **RESTful API Design:** Practice designing clean REST endpoints with proper HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and status codes.
5. **Cloud Deployment:** Deploy individual microservices to a cloud platform (Render) using `Procfile` and `requirements.txt`.

---

## Screenshots

### Customer Service

1.
   <!-- Add screenshot here -->

2.
   <!-- Add screenshot here -->

---

### Order Service

1.
   <!-- Add screenshot here -->

2.
   <!-- Add screenshot here -->
