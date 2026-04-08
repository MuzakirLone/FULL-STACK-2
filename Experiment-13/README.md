# Experiment-13: Student Management REST API (Flask)

A complete RESTful API for managing student records with CRUD operations, built using Flask, SQLAlchemy, and Marshmallow for validation.

---

## Architecture

```
Flask Application
    ↓
SQLAlchemy ORM
    ↓
PostgreSQL (Production) / SQLite (Development)
```

The API supports automatic database switching between PostgreSQL (for cloud deployment) and SQLite (for local development).

---

## Setup (Local)

### Prerequisites
- Python 3.8+
- pip

### Installation

```bash
cd "Experiment-13"
pip install -r requirements.txt
python app.py
```

Runs at: `http://localhost:5000`

---

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API home / status check |
| `GET` | `/health` | Health check endpoint |
| `GET` | `/students` | Get all students (with pagination) |
| `GET` | `/students/<id>` | Get a specific student by ID |
| `POST` | `/students` | Create a new student |
| `PUT` | `/students/<id>` | Update an existing student |
| `DELETE` | `/students/<id>` | Delete a student |

---

## API Testing Guide

> Use Postman, Thunder Client, or cURL to test the endpoints below.

---

### 1. Home / Status Check

- **Method:** `GET`
- **URL:** `http://localhost:5000/`

**Expected Response (200):**
```json
{
  "status": "success",
  "message": "Student Management API is running 🚀",
  "version": "1.0"
}
```

---

### 2. Health Check

- **Method:** `GET`
- **URL:** `http://localhost:5000/health`

**Expected Response (200):**
```json
{
  "status": "healthy",
  "service": "student-api"
}
```

---

### 3. Create a Student

- **Method:** `POST`
- **URL:** `http://localhost:5000/students`
- **Headers:** `Content-Type: application/json`
- **Body (raw → JSON):**
```json
{
  "uid": "STU001",
  "name": "John Doe",
  "age": 20
}
```

**Expected Response (201):**
```json
{
  "status": "success",
  "message": "Student created successfully",
  "data": {
    "id": 1,
    "uid": "STU001",
    "name": "John Doe",
    "age": 20
  }
}
```

**Error — Missing fields (400):**
```json
{
  "status": "error",
  "errors": {
    "name": ["Student name is required"],
    "age": ["Student age is required"]
  }
}
```

**Error — Duplicate UID (400):**
```json
{
  "status": "error",
  "message": "Student with this UID already exists"
}
```

---

### 4. Get All Students (Paginated)

- **Method:** `GET`
- **URL:** `http://localhost:5000/students?page=1&limit=5`

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 5, max: 100)

**Expected Response (200):**
```json
{
  "status": "success",
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 5,
    "pages": 2
  },
  "data": [
    {
      "id": 1,
      "uid": "STU001",
      "name": "John Doe",
      "age": 20
    },
    {
      "id": 2,
      "uid": "STU002",
      "name": "Jane Smith",
      "age": 22
    }
  ]
}
```

---

### 5. Get Single Student

- **Method:** `GET`
- **URL:** `http://localhost:5000/students/1`

**Expected Response (200):**
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

**Error — Student not found (404):**
```json
{
  "status": "error",
  "message": "Resource not found"
}
```

---

### 6. Update Student

- **Method:** `PUT`
- **URL:** `http://localhost:5000/students/1`
- **Headers:** `Content-Type: application/json`
- **Body (raw → JSON):**
```json
{
  "name": "John Updated",
  "age": 21
}
```

**Expected Response (200):**
```json
{
  "status": "success",
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "uid": "STU001",
    "name": "John Updated",
    "age": 21
  }
}
```

**Error — Validation failed (400):**
```json
{
  "status": "error",
  "errors": {
    "age": ["Must be between 1 and 120."]
  }
}
```

---

### 7. Delete Student

- **Method:** `DELETE`
- **URL:** `http://localhost:5000/students/1`

**Expected Response (200):**
```json
{
  "status": "success",
  "message": "Student John Doe deleted successfully"
}
```

**Error — Student not found (404):**
```json
{
  "status": "error",
  "message": "Resource not found"
}
```

---

## Database Schema

### Student Model

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | Integer | Primary Key, Auto-increment |
| `uid` | String(20) | Unique, Not Null, Indexed |
| `name` | String(100) | Not Null |
| `age` | Integer | Not Null |

---

## Validation Rules

| Field | Rules |
|-------|-------|
| `name` | Required, 2-100 characters |
| `age` | Required, Integer, 1-120 |
| `uid` | Required, 3-20 characters, Unique |

---

## Error Reference

| Code | Reason |
|------|--------|
| `200` | Request successful |
| `201` | Resource created successfully |
| `400` | Validation error or duplicate UID |
| `404` | Student not found |
| `500` | Internal server error |

---

## Deployment

### Using Gunicorn (Production)

```bash
gunicorn app:app
```

The `ProcFile` is configured for deployment on platforms like Render or Heroku.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `sqlite:///students.db` |
| `PORT` | Server port | `5000` |

---

## Project Structure

```
Experiment-13/
│
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── ProcFile              # Deployment configuration
└── README.md             # This file
```

---

## Features

✅ **CRUD Operations:** Complete Create, Read, Update, Delete functionality  
✅ **Data Validation:** Marshmallow schema validation with custom error messages  
✅ **Pagination:** Efficient data retrieval with configurable page size  
✅ **Database Flexibility:** Automatic switching between PostgreSQL and SQLite  
✅ **Error Handling:** Comprehensive error handlers for validation, 404, and 500 errors  
✅ **RESTful Design:** Standard HTTP methods and status codes  
✅ **Production Ready:** Gunicorn configuration for deployment  

---

## Learning Outcomes

1. **RESTful API Development:** Build a complete REST API following industry best practices with proper HTTP methods and status codes.
2. **ORM (Object-Relational Mapping):** Use SQLAlchemy to interact with databases using Python objects instead of raw SQL.
3. **Data Validation:** Implement robust input validation using Marshmallow schemas to ensure data integrity.
4. **Database Management:** Handle database connections, migrations, and automatic switching between development and production databases.
5. **Error Handling:** Implement comprehensive error handling with meaningful error messages and appropriate HTTP status codes.
6. **Pagination:** Implement efficient data pagination for handling large datasets.
7. **Cloud Deployment:** Deploy Flask applications to cloud platforms using environment variables and process managers like Gunicorn.

---

## Technologies Used

- **Flask** - Lightweight web framework
- **SQLAlchemy** - ORM for database operations
- **Marshmallow** - Data validation and serialization
- **PostgreSQL** - Production database (cloud)
- **SQLite** - Development database (local)
- **Gunicorn** - WSGI HTTP server for production

---

## License

This project is for educational purposes as part of Full-Stack Development coursework.
