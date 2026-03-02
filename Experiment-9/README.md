# Experiment-9: Token-Based Authentication (Flask)

A Flask backend server implementing three types of token-based authentication.

---

## Setup

```bash
cd "Experiment-9"
pip install -r requirements.txt
python app.py
```

Server runs at: `http://localhost:5000`

**Demo Credentials:** `admin` / `password123`

---

## Endpoints

| Method | Endpoint | Auth Type |
|--------|----------|-----------|
| `GET` | `/auth/basic` | HTTP Basic Auth |
| `GET` | `/auth/custom` | Custom Header Auth |
| `POST` | `/auth/login` | JWT Login |
| `GET` | `/auth/jwt` | JWT Protected Route |

---

## Postman Testing Guide

### 1. HTTP Basic Auth — `GET /auth/basic`

Credentials are encoded as `Base64(username:password)` and sent via the standard `Authorization` header.

- **Method:** `GET`
- **URL:** `http://localhost:5000/auth/basic`
- **Authorization Tab:**
  - Type → `Basic Auth`
  - Username: `admin`
  - Password: `password123`

**Expected Response (200):**
```json
{
  "status": "success",
  "auth_type": "HTTP Basic Auth (Authorization Header)",
  "message": "Welcome, admin! You are authenticated via Basic Auth.",
  "user": "admin"
}
```

**Error (401):** Missing/wrong credentials → `Invalid username or password`

---

### 2. Custom Header Auth — `GET /auth/custom`

Credentials are sent as plain-text custom HTTP headers.

- **Method:** `GET`
- **URL:** `http://localhost:5000/auth/custom`
- **Headers Tab:**

| Key | Value |
|-----|-------|
| `X-Username` | `admin` |
| `X-Password` | `password123` |

**Expected Response (200):**
```json
{
  "status": "success",
  "auth_type": "Custom Header Auth",
  "message": "Welcome, admin! You are authenticated via Custom Headers.",
  "user": "admin"
}
```

---

### 3. JWT Bearer Auth

JWT auth requires two steps: **login** to get a token, then **use the token** on the protected route.

#### Step 1 — Login: `POST /auth/login`

- **Method:** `POST`
- **URL:** `http://localhost:5000/auth/login`
- **Body:** `raw` → `JSON`
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "status": "success",
  "auth_type": "JWT",
  "message": "Login successful. Use the token as: Authorization: Bearer <token>",
  "token": "<your-jwt-token-here>",
  "expires_in": "1 hour"
}
```

> **Copy the `token` value** from the response.

#### Step 2 — Access Protected Route: `GET /auth/jwt`

- **Method:** `GET`
- **URL:** `http://localhost:5000/auth/jwt`
- **Headers Tab:**

| Key | Value |
|-----|-------|
| `Authorization` | `Bearer <paste-token-here>` |

**Expected Response (200):**
```json
{
  "status": "success",
  "auth_type": "JWT Bearer Auth",
  "message": "Welcome, admin! You accessed a JWT-protected route.",
  "user": "admin",
  "token_issued_at": "...",
  "token_expires_at": "..."
}
```

**Error (401):** Expired token → `Token has expired. Please login again.`

---

## Error Reference

| Code | Reason |
|------|--------|
| `400` | Malformed request body or credentials format |
| `401` | Missing, incorrect, or expired credentials/token |
| `200` | Authenticated successfully |
