# Experiment No. 16: Perform Unit Testing for Frontend & Backend Modules

## Aim
To implement unit testing for full-stack applications, utilizing backend testing tools with Flask and Pytest, as well as frontend unit testing components with React, Vite, and JavaScript testing frameworks.

---

## Theory

### Importance of Testing
- **Improves Reliability:** Ensures that individual units of source code correspond accurately to what the program is intended to do.
- **Prevents Regressions:** Catches errors created by recent code changes before they can impact users.
- **Maintains Code Quality:** Facilitates refactoring and guarantees correctness through CI/CD pipelines.

### Types of Testing
- **Unit Testing:** Testing individual components or functions isolated from the rest.
- **Integration Testing:** Testing how multiple components work together.
- **System Testing:** Testing the entire system as a whole.
- **Acceptance Testing:** Validating the system against business requirements.

### Backend Testing (Flask)
Flask provides a lightweight test client that allows the simulation of HTTP requests against application routes without having to start a live server. We combine it with `pytest` for streamlined case execution.

### Frontend Testing (React / JS)
Frontend testing examines component rendering, user interactions, and visual layout. Tools such as Jest, RTL (React Testing Library), or Vitest allow for rigorous execution of these checks to verify component integrity.

---

## ⚙️ Technologies Used

### Backend
- **Language:** Python
- **Framework:** Flask
- **Testing:** Pytest, Pytest-Cov
- **Environment:** Virtual Environment (venv)

### Frontend
- **Framework:** React (via Vite)
- **Language:** JavaScript / JSX
- **Testing:** Vitest / Jest (with React Testing Library)

---

## 📁 Project Structure

```text
FULL-STACK-2/Experiment-16/
├── Experiment_16_Backend/
│   ├── routes/
│   │   └── student_routes.py
│   ├── app.py
│   ├── run.py
│   ├── test_app.py
│   ├── requirements.txt
│   └── README.md
│
└── Experiment_16_Frontend/
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── README.md
```

---

## How to Run the Project

### 1. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd Experiment-16/Experiment_16_Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

*The Backend Server typically runs at `http://localhost:5000`.*

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd Experiment-16/Experiment_16_Frontend
npm install
npm run dev
```

*The Frontend app will typically run at `http://localhost:5173`.*

---

## Backend API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/students`      | Create student    |
| GET    | `/students`      | Get all students  |
| GET    | `/students/<id>` | Get student by ID |
| PUT    | `/students/<id>` | Update student    |
| DELETE | `/students/<id>` | Delete student    |

---

## Running Tests

### Backend Tests

To run the Pytest suite for the backend APIs:

```bash
cd Experiment-16/Experiment_16_Backend
pytest -v
```

**Generate Coverage Report:**
```bash
pytest --cov=app --cov-report=term-missing --cov-report=html
```

### Frontend Tests

To run tests on your React components:

```bash
cd Experiment-16/Experiment_16_Frontend
npm run test
```

---

## Screenshots

### Backend Testing

**1. Server Running**
<img width="655" height="208" alt="Screenshot 2026-04-17 155044" src="https://github.com/user-attachments/assets/b08e2b85-9ca1-477f-984e-c521d575a854" />

**2. All Tests Passed**
<img width="1451" height="470" alt="Screenshot 2026-04-17 153028" src="https://github.com/user-attachments/assets/381dcb23-4de6-4237-8788-fe820bfb4050" />

**4. Coverage Report (Terminal)**
<img width="937" height="538" alt="WhatsApp Image 2026-04-17 at 4 11 37 PM" src="https://github.com/user-attachments/assets/229046f9-42ba-4296-b4f5-c57424c4109a" />

### Frontend Testing

**1. Frontend Application Running**
<img width="1171" height="637" alt="image" src="https://github.com/user-attachments/assets/f548cf0f-3538-4d74-8ce0-f4f27e155a31" />

**2. Component Tests Passed**
<img width="1443" height="474" alt="Screenshot 2026-04-17 154627" src="https://github.com/user-attachments/assets/7ececc59-c412-40a0-b9ca-c9fa14ac55bb" />

**3. Test Coverage Report (If Applicable)**
<img width="1392" height="609" alt="Screenshot 2026-04-17 154824" src="https://github.com/user-attachments/assets/fa7d0cfb-8f4d-4a42-8bfc-450d8fb6cfb7" />

---

## Learning Outcomes

- Understood how to architect unit tests for backend APIs using Flask and Pytest.
- Explored code coverage generation to find untested portions of the python application.
- Gained knowledge of debugging techniques and error isolation.
- Explored frontend unit testing in a modern React application powered by Vite.
- Improved overall understanding of the software testing lifecycle across the stack.
