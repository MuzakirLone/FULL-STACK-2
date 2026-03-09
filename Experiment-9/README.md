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


## Learning Outcomes

1. **HTTP Basic Authentication:** Understand how to implement basic authentication using the `Authorization: Basic` header and Base64 encoding.
2. **Custom Header Authentication:** Learn to use custom HTTP headers (e.g., `X-Username`, `X-Password`) for passing credentials.
3. **JWT (JSON Web Tokens):** Understand the structure of JWTs (header, payload, signature) and how to generate, sign, and verify them using `PyJWT`.
4. **Token-Based Security:** Implement token-based authentication for securing API endpoints and protecting sensitive data.
5. **Flask Authentication:** Gain practical experience in building authentication systems using Flask and Flask-CORS.

## Screenshots

1.
   <img width="1252" height="719" alt="image" src="https://github.com/user-attachments/assets/1dc04879-1f57-420f-b4b8-b5c1ce447392" />
2.
   <img width="1251" height="745" alt="image" src="https://github.com/user-attachments/assets/526502d2-f55f-4cb9-9622-76ae66247e08" />
3.
   <img width="1249" height="737" alt="image" src="https://github.com/user-attachments/assets/37a918bd-5cfa-48f2-9ea0-2a370c3b94c5" />
4.
   <img width="1252" height="815" alt="image" src="https://github.com/user-attachments/assets/eed7d8e6-8fbf-4a7d-a86e-39635239c4b8" />
5.
    <img width="1267" height="780" alt="image" src="https://github.com/user-attachments/assets/aa3a3081-1240-4c83-a5b8-ef2d64006af5" />
