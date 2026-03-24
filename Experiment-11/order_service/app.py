from flask import Flask, jsonify, request

app = Flask(__name__)

# ── In-memory data store ───────────────────────────────────────────────────
VALID_STATUSES = {"pending", "processing", "shipped", "delivered", "cancelled"}

orders = {
    101: {"id": 101, "customer_id": 1, "item": "Laptop",     "status": "delivered"},
    102: {"id": 102, "customer_id": 1, "item": "Mouse",      "status": "shipped"},
    103: {"id": 103, "customer_id": 2, "item": "Keyboard",   "status": "pending"},
    104: {"id": 104, "customer_id": 3, "item": "Monitor",    "status": "processing"},
}

# ── Routes ─────────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def home():
    return jsonify({"service": "Order Service", "status": "running"}), 200


@app.route("/orders", methods=["GET"])
def get_orders():
    """Return all orders."""
    return jsonify(list(orders.values())), 200


@app.route("/orders/<int:order_id>", methods=["GET"])
def get_order(order_id):
    """Return a single order by ID."""
    order = orders.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify(order), 200


@app.route("/orders", methods=["POST"])
def create_order():
    """Create a new order."""
    data = request.get_json()
    if not data or "customer_id" not in data or "item" not in data:
        return jsonify({"error": "customer_id and item are required"}), 400

    new_id = max(orders.keys(), default=100) + 1
    new_order = {
        "id": new_id,
        "customer_id": data["customer_id"],
        "item": data["item"],
        "status": data.get("status", "pending"),
    }
    orders[new_id] = new_order
    return jsonify(new_order), 201


@app.route("/orders/<int:order_id>/status", methods=["PUT"])
def update_order_status(order_id):
    """Update the status of an existing order."""
    order = orders.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    data = request.get_json()
    if not data or "status" not in data:
        return jsonify({"error": "status field is required"}), 400

    new_status = data["status"]
    if new_status not in VALID_STATUSES:
        return jsonify({
            "error": f"Invalid status. Must be one of: {sorted(VALID_STATUSES)}"
        }), 400

    order["status"] = new_status
    orders[order_id] = order
    return jsonify(order), 200


@app.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    """Delete an order."""
    order = orders.pop(order_id, None)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify({"message": f"Order {order_id} deleted successfully"}), 200


# ── Entry point ────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
