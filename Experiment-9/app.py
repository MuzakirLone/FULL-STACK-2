"""
Experiment-9: Token-Based Authentication using Flask
=====================================================
Endpoints:
  GET  /auth/basic   - HTTP Basic Auth (Authorization: Basic <base64>)
  GET  /auth/custom  - Custom Header Auth (X-Username / X-Password)
  POST /auth/login   - JWT Login → returns Bearer token
  GET  /auth/jwt     - JWT Protected route (Authorization: Bearer <token>)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import jwt
import datetime

app = Flask(__name__)
CORS(app)

# ── Demo credentials ──────────────────────────────────────────────────────────
VALID_USERNAME = "admin"
VALID_PASSWORD = "password123"

# ── JWT secret key (keep secret in production!) ───────────────────────────────
JWT_SECRET = "experiment9_super_secret_key"
JWT_ALGORITHM = "HS256"

# ─────────────────────────────────────────────────────────────────────────────
# Helper: validate credentials
# ─────────────────────────────────────────────────────────────────────────────
def check_credentials(username, password):
    return username == VALID_USERNAME and password == VALID_PASSWORD


# ─────────────────────────────────────────────────────────────────────────────
# 1. Basic Auth — Authorization: Basic <base64(username:password)>
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/auth/basic", methods=["GET"])
def basic_auth():
    """
    Expects header:
        Authorization: Basic <base64-encoded "username:password">
    """
    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Basic "):
        return jsonify({
            "status": "error",
            "message": "Missing or invalid Authorization header. Use: Authorization: Basic <base64(username:password)>"
        }), 401

    try:
        # Decode Base64
        encoded = auth_header.split(" ", 1)[1]
        decoded = base64.b64decode(encoded).decode("utf-8")
        username, password = decoded.split(":", 1)
    except Exception:
        return jsonify({"status": "error", "message": "Malformed Basic Auth credentials"}), 400

    if check_credentials(username, password):
        return jsonify({
            "status": "success",
            "auth_type": "HTTP Basic Auth (Authorization Header)",
            "message": f"Welcome, {username}! You are authenticated via Basic Auth.",
            "user": username
        }), 200

    return jsonify({"status": "error", "message": "Invalid username or password"}), 401


# ─────────────────────────────────────────────────────────────────────────────
# 2. Custom Header Auth — X-Username / X-Password
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/auth/custom", methods=["GET"])
def custom_header_auth():
    """
    Expects headers:
        X-Username: admin
        X-Password: password123
    """
    username = request.headers.get("X-Username", "")
    password = request.headers.get("X-Password", "")

    if not username or not password:
        return jsonify({
            "status": "error",
            "message": "Missing custom headers. Provide: X-Username and X-Password"
        }), 401

    if check_credentials(username, password):
        return jsonify({
            "status": "success",
            "auth_type": "Custom Header Auth",
            "message": f"Welcome, {username}! You are authenticated via Custom Headers.",
            "user": username
        }), 200

    return jsonify({"status": "error", "message": "Invalid username or password"}), 401


# ─────────────────────────────────────────────────────────────────────────────
# 3a. JWT Login — returns a signed JWT token
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/auth/login", methods=["POST"])
def jwt_login():
    """
    Body (JSON):
        { "username": "admin", "password": "password123" }

    Returns:
        { "token": "<JWT>" }
    """
    data = request.get_json(silent=True, force=True)

    if not data:
        return jsonify({"status": "error", "message": "Request body must be JSON"}), 400

    username = data.get("username", "")
    password = data.get("password", "")

    if not check_credentials(username, password):
        return jsonify({"status": "error", "message": "Invalid username or password"}), 401

    # Build JWT payload
    payload = {
        "sub": username,
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return jsonify({
        "status": "success",
        "auth_type": "JWT",
        "message": "Login successful. Use the token as: Authorization: Bearer <token>",
        "token": token,
        "expires_in": "1 hour"
    }), 200


# ─────────────────────────────────────────────────────────────────────────────
# 3b. JWT Protected Route — Authorization: Bearer <token>
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/auth/jwt", methods=["GET"])
def jwt_protected():
    """
    Expects header:
        Authorization: Bearer <JWT token obtained from /auth/login>
    """
    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Bearer "):
        return jsonify({
            "status": "error",
            "message": "Missing or invalid Authorization header. Use: Authorization: Bearer <token>"
        }), 401

    token = auth_header.split(" ", 1)[1]

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        return jsonify({"status": "error", "message": "Token has expired. Please login again."}), 401
    except jwt.InvalidTokenError as e:
        return jsonify({"status": "error", "message": f"Invalid token: {str(e)}"}), 401

    return jsonify({
        "status": "success",
        "auth_type": "JWT Bearer Auth",
        "message": f"Welcome, {payload['sub']}! You accessed a JWT-protected route.",
        "user": payload["sub"],
        "token_issued_at": str(datetime.datetime.utcfromtimestamp(payload["iat"])),
        "token_expires_at": str(datetime.datetime.utcfromtimestamp(payload["exp"]))
    }), 200


# ─────────────────────────────────────────────────────────────────────────────
# Home — list all routes
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "experiment": "Experiment-9: Token-Based Authentication",
        "endpoints": {
            "GET  /auth/basic": "HTTP Basic Auth (Authorization: Basic <base64>)",
            "GET  /auth/custom": "Custom Header Auth (X-Username / X-Password)",
            "POST /auth/login": "JWT Login — Body: {username, password}",
            "GET  /auth/jwt": "JWT Protected Route (Authorization: Bearer <token>)"
        }
    }), 200


# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 55)
    print("  Experiment-9: Token-Based Authentication Server")
    print("  Running at http://localhost:5000")
    print("=" * 55)
    app.run(debug=True, port=5000)
