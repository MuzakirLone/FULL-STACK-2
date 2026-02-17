# Postman Testing Guide for Student REST API

This guide provides step-by-step instructions for testing the Student Management REST API using Postman.

## Prerequisites

1. **Install Postman**: Download from [postman.com](https://www.postman.com/downloads/)
2. **Start the Flask server**:
   ```powershell
   cd "c:\Users\muzak\OneDrive\Documents\6th Semester\FULL-STACK-2\Experiment-8\backend\rest-api-lab"
   .\virenv\Scripts\Activate.ps1
   python run.py
   ```
3. **Verify server is running**: You should see `Running on http://0.0.0.0:5000` in the console

## Base URL

All requests use: `http://localhost:5000`

---

## API Endpoints Testing

### 1. Health Check (Test Server is Running)

**Request:**
- **Method**: `GET`
- **URL**: `http://localhost:5000/`

**Expected Response:**
```json
{
    "message": "Backend Server is running"
}
```
**Status Code**: `200 OK`

---

### 2. CREATE Student (POST)

**Request:**
- **Method**: `POST`
- **URL**: `http://localhost:5000/students`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
  ```json
  {
      "name": "Muzakir Lone",
      "age": 21
  }
  ```

**Expected Response:**
```json
{
    "id": 1,
    "name": "Muzakir Lone",
    "age": 21
}
```
**Status Code**: `201 Created`

**Test Multiple Students:**
Create 2-3 more students with different data:
```json
{
    "name": "Alice Smith",
    "age": 22
}
```
```json
{
    "name": "Bob Johnson",
    "age": 20
}
```

---

### 3. GET All Students (READ ALL)

**Request:**
- **Method**: `GET`
- **URL**: `http://localhost:5000/students`

**Expected Response:**
```json
[
    {
        "id": 1,
        "name": "Muzakir Lone",
        "age": 21
    },
    {
        "id": 2,
        "name": "Alice Smith",
        "age": 22
    },
    {
        "id": 3,
        "name": "Bob Johnson",
        "age": 20
    }
]
```
**Status Code**: `200 OK`

---

### 4. GET Student by ID (READ ONE)

**Request:**
- **Method**: `GET`
- **URL**: `http://localhost:5000/students/1`

**Expected Response:**
```json
{
    "id": 1,
    "name": "Muzakir Lone",
    "age": 21
}
```
**Status Code**: `200 OK`

**Test Error Case (Non-existent ID):**
- **URL**: `http://localhost:5000/students/999`
- **Expected Response**:
  ```json
  {
      "error": "Student not found"
  }
  ```
- **Status Code**: `404 Not Found`

---

### 5. UPDATE Student (PUT)

**Request:**
- **Method**: `PUT`
- **URL**: `http://localhost:5000/students/1`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
  ```json
  {
      "name": "Muzakir Lone Updated",
      "age": 22
  }
  ```

**Expected Response:**
```json
{
    "id": 1,
    "name": "Muzakir Lone Updated",
    "age": 22
}
```
**Status Code**: `200 OK`

**Verify Update:**
- Send GET request to `/students/1` to verify the changes

---

### 6. DELETE Student

**Request:**
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/students/1`

**Expected Response:**
```json
{
    "message": "Deleted successfully"
}
```
**Status Code**: `200 OK`

**Verify Deletion:**
- Send GET request to `/students/1` - should return `404 Not Found`
- Send GET request to `/students` - student ID 1 should not be in the list

---

## Postman Setup Instructions

### Step 1: Create a New Collection

1. Open Postman
2. Click **"New"** → **"Collection"**
3. Name it: `Student Management API`

### Step 2: Add Requests

For each endpoint above:

1. Click **"Add Request"** in your collection
2. Name the request (e.g., "Create Student", "Get All Students")
3. Select the HTTP method (GET, POST, PUT, DELETE)
4. Enter the URL
5. For POST/PUT requests:
   - Go to **"Body"** tab
   - Select **"raw"**
   - Choose **"JSON"** from the dropdown
   - Paste the JSON body
6. Click **"Send"** to test

### Step 3: Organize Tests

Recommended order for testing:

1. ✅ Health Check (GET /)
2. ✅ Create Student #1 (POST /students)
3. ✅ Create Student #2 (POST /students)
4. ✅ Create Student #3 (POST /students)
5. ✅ Get All Students (GET /students)
6. ✅ Get Student by ID (GET /students/1)
7. ✅ Get Non-existent Student (GET /students/999) - Error test
8. ✅ Update Student (PUT /students/1)
9. ✅ Verify Update (GET /students/1)
10. ✅ Delete Student (DELETE /students/1)
11. ✅ Verify Deletion (GET /students/1) - Should 404
12. ✅ Get All Students again (verify student 1 is gone)

---

## Error Testing Scenarios

### 1. Missing Required Field (Name)

**Request:**
- **Method**: `POST`
- **URL**: `http://localhost:5000/students`
- **Body**:
  ```json
  {
      "age": 25
  }
  ```

**Expected Response:**
```json
{
    "error": "Name is required"
}
```
**Status Code**: `400 Bad Request`

### 2. Invalid JSON

**Request:**
- **Method**: `POST`
- **URL**: `http://localhost:5000/students`
- **Body**: `{invalid json}`

**Expected**: Flask will return a 400 error

---

## Check Console Logs

While testing, check your Flask server console. You should see middleware logs like:

```
[2026-02-17 10:00:00] POST /students
[2026-02-17 10:00:00] Response Status: 201
[2026-02-17 10:00:05] GET /students
[2026-02-17 10:00:05] Response Status: 200
```

---

## Tips for Effective Testing

1. **Test in order**: Start with CREATE, then READ, UPDATE, DELETE
2. **Save examples**: Save successful responses as examples in Postman
3. **Use variables**: Create environment variables for `base_url`
4. **Test edge cases**: Always test error scenarios
5. **Monitor logs**: Keep an eye on server console for debugging
6. **Use Collections**: Organize all requests in a Postman collection for reusability

---

## Summary

This API provides complete CRUD functionality:
- ✅ **C**reate - POST /students
- ✅ **R**ead - GET /students, GET /students/:id
- ✅ **U**pdate - PUT /students/:id
- ✅ **D**elete - DELETE /students/:id

All endpoints are tested and ready for use!
