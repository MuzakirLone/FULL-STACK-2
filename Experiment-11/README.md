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
  <img width="1284" height="458" alt="Screenshot 2026-03-24 110412" src="https://github.com/user-attachments/assets/bf99527c-6e22-4043-abe5-101c7eef8f96" />
2.
   <img width="1257" height="783" alt="Screenshot 2026-03-24 110424" src="https://github.com/user-attachments/assets/80aa6992-bc5a-484a-ac6e-69da71e2c324" />
3. 
   <img width="1262" height="468" alt="Screenshot 2026-03-24 110433" src="https://github.com/user-attachments/assets/7fc6a0b5-8c85-4944-b914-7f7766b0c4ea" />
4. 
   <img width="1258" height="715" alt="Screenshot 2026-03-24 110441" src="https://github.com/user-attachments/assets/97b6a267-fd9d-4692-b7d4-6c9ef05ace71" />
5.
   <img width="1250" height="460" alt="Screenshot 2026-03-24 110450" src="https://github.com/user-attachments/assets/ae10117d-9a17-45e0-a3b3-bf22b11f30f4" />
6.
   <img width="1265" height="499" alt="Screenshot 2026-03-24 110459" src="https://github.com/user-attachments/assets/b6c1538a-d0b2-4389-911f-79cbfdc9496a" />

---

### Order Service

1.
   <!-- Add screenshot here -->

2.
   <!-- Add screenshot here -->
