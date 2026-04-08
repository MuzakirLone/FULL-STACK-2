# Experiment-13: Student Management REST API (Flask)

A Flask-based REST API for managing student records with CRUD operations, validation, pagination, and deployment support for Render or local development.

---

## Overview

The application stores student data in a SQL database through SQLAlchemy. It uses PostgreSQL when `DATABASE_URL` is available and falls back to SQLite for local testing.

---

## Setup

### Local Run

```bash
cd "Experiment-13"
pip install -r requirements.txt
python app.py
```

By default, the app runs at `http://localhost:5000`.

### Production Run

The `Procfile` starts the application with Gunicorn:

```bash
web: gunicorn app:app
```

### Render Link: 
-https://two3bis70067-experiment-13.onrender.com/

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `sqlite:///students.db` |

If `DATABASE_URL` starts with `postgres://`, the app converts it to `postgresql://` for compatibility.

---

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API home/status check |
| `GET` | `/health` | Health check |
| `GET` | `/students` | Get all students with pagination |
| `GET` | `/students/<id>` | Get a single student by ID |
| `POST` | `/students` | Create a new student |
| `PUT` | `/students/<id>` | Update an existing student |
| `DELETE` | `/students/<id>` | Delete a student |

---

## API Examples

### Home

`GET /`

```json
{
  "status": "success",
  "message": "Student API Running 🚀"
}
```

### Health Check

`GET /health`

```json
{
  "status": "OK"
}
```

### Create Student

`POST /students`

```json
{
  "uid": "STU001",
  "name": "John Doe",
  "age": 20
}
```

Expected response:

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "uid": "STU001",
    "name": "John Doe",
    "age": 20
  }
}
```

### Get Students with Pagination

`GET /students?page=1&limit=5`

Expected response shape:

```json
{
  "status": "success",
  "total": 10,
  "page": 1,
  "data": []
}
```

### Get Single Student

`GET /students/1`

### Update Student

`PUT /students/1`

```json
{
  "name": "John Updated",
  "age": 21
}
```

### Delete Student

`DELETE /students/1`

---

## Validation Rules

| Field | Rule |
|-------|------|
| `uid` | Required, at least 3 characters |
| `name` | Required, at least 2 characters |
| `age` | Required, integer, between 1 and 120 |

---

## Error Responses

| Code | Reason |
|------|--------|
| `400` | Validation error or duplicate UID |
| `404` | Student not found |
| `500` | Internal server error |

Common error payloads:

```json
{
  "status": "error",
  "message": "Resource not found"
}
```

```json
{
  "status": "error",
  "message": "UID already exists"
}
```

---

## Project Structure

```
Experiment-13/
├── app.py
├── Procfile
├── requirements.txt
├── instance/
└── README.md
```

---

## Learning Outcomes

1. Understand how to build a RESTful API with Flask for basic CRUD operations.
2. Learn how to connect Flask with SQLAlchemy for database-backed applications.
3. Practice using Marshmallow validation to enforce input rules and return useful errors.
4. Learn how to implement pagination and standard HTTP status codes in an API.
5. Understand how to prepare a Flask app for deployment with Gunicorn and Render.
