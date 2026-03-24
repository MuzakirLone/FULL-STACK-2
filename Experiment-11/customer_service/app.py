from flask import Flask, jsonify, request

app = Flask(__name__)

# ── In-memory data stores ──────────────────────────────────────────────────
customers = {
    1: {"id": 1, "name": "Alice Johnson", "email": "alice@example.com"},
    2: {"id": 2, "name": "Bob Smith",    "email": "bob@example.com"},
    3: {"id": 3, "name": "Carol White",  "email": "carol@example.com"},
}

orders = {
    101: {"id": 101, "customer_id": 1, "item": "Laptop",     "status": "delivered"},
    102: {"id": 102, "customer_id": 1, "item": "Mouse",      "status": "shipped"},
    103: {"id": 103, "customer_id": 2, "item": "Keyboard",   "status": "pending"},
    104: {"id": 104, "customer_id": 3, "item": "Monitor",    "status": "processing"},
}

# ── Routes ─────────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def home():
    return jsonify({"service": "Customer Service", "status": "running"}), 200


@app.route("/customers", methods=["GET"])
def get_customers():
    """Return all customers."""
    return jsonify(list(customers.values())), 200


@app.route("/customers/<int:customer_id>", methods=["GET"])
def get_customer(customer_id):
    """Return a single customer by ID."""
    customer = customers.get(customer_id)
    if not customer:
        return jsonify({"error": "Customer not found"}), 404
    return jsonify(customer), 200


@app.route("/customers/<int:customer_id>/orders", methods=["GET"])
def get_customer_orders(customer_id):
    """Return all orders belonging to a customer."""
    if customer_id not in customers:
        return jsonify({"error": "Customer not found"}), 404

    customer_orders = [o for o in orders.values() if o["customer_id"] == customer_id]
    return jsonify(customer_orders), 200


@app.route("/customers", methods=["POST"])
def create_customer():
    """Create a new customer."""
    data = request.get_json()
    if not data or "name" not in data or "email" not in data:
        return jsonify({"error": "name and email are required"}), 400

    new_id = max(customers.keys(), default=0) + 1
    new_customer = {"id": new_id, "name": data["name"], "email": data["email"]}
    customers[new_id] = new_customer
    return jsonify(new_customer), 201


# ── Entry point ────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
