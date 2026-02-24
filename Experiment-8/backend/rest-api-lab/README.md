# Experiment-8: REST API with Flask

A simple backend REST API built using **Flask** (Python) that performs full **CRUD** (Create, Read, Update, Delete) operations on student data. The project uses an in-memory data store, Flask Blueprints for modular routing, and custom middleware for request logging.

## Project Structure

```
rest-api-lab/
├── app.py               # App factory and root route
├── run.py               # Entry point to start the server
├── routes/
│   └── student_routes.py  # Student CRUD endpoints (Blueprint)
└── middleware/
    └── logger.py          # Request logging middleware
```

## API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/`                   | Health check         |
| POST   | `/students`           | Create a student     |
| GET    | `/students`           | Get all students     |
| GET    | `/students/<id>`      | Get student by ID    |
| PUT    | `/students/<id>`      | Update a student     |
| DELETE | `/students/<id>`      | Delete a student     |

## Running the App

```bash
pip install flask
python run.py
```

Server starts at `http://localhost:5000`

---

## Learning Outcomes

- Understand how to set up a **Flask** application using the app factory pattern.
- Learn how to define and register **Blueprints** to organize routes in a modular way.
- Implement all four **CRUD operations** (POST, GET, PUT, DELETE) using REST conventions.
- Handle **JSON request/response** cycles and proper HTTP status codes in a Flask API.
- Build and apply **custom middleware** for cross-cutting concerns like request logging.
- Test REST API endpoints using tools like **Postman** or `curl`.
