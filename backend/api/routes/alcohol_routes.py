from flask import Blueprint, request, jsonify
from ..controllers import alcohol_controller
from ..models.alcohol import Alcohol

alcohol_controller = alcohol_controller.AlcoholController()

alcohol_bp = Blueprint("alcohol", __name__, url_prefix="/api/alcohol")


@alcohol_bp.route("/create", methods=["POST"])
def create_alcohol():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in the request data."}), 400

    if "alcohol_type" not in data or "quantity" not in data:
        return (
            jsonify({"message": "Alcohol type and quantity are required fields"}),
            400,
        )

    alcohol = Alcohol(
        user_id=user_id,
        alcohol_type=data.get("alcohol_type"),
        quantity=data.get("quantity"),
    )

    try:
        alcohol_controller.db.session.add(alcohol)
        alcohol_controller.db.session.commit()
        return (
            jsonify(
                {"message": "Alcohol entry created successfully", "data": alcohol.id}
            ),
            201,
        )
    except Exception as e:
        alcohol_controller.db.session.rollback()
        return jsonify({"message": "Failed to create alcohol entry"}), 500


@alcohol_bp.route("/update/<int:alcohol_id>", methods=["PUT"])
def update_alcohol(alcohol_id):
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in the request data."}), 400

    if "alcohol_type" not in data or "quantity" not in data:
        return (
            jsonify({"message": "Alcohol type and quantity are required fields"}),
            400,
        )

    alcohol = Alcohol.query.get(alcohol_id)

    if not alcohol:
        return jsonify({"message": "Alcohol entry not found"}), 404

    if alcohol.user_id != user_id:
        return (
            jsonify({"message": "Unauthorized. User ID does not match alcohol owner"}),
            403,
        )

    alcohol.alcohol_type = data["alcohol_type"]
    alcohol.quantity = data["quantity"]

    try:
        alcohol_controller.db.session.commit()
        return jsonify(
            {"message": "Alcohol entry updated successfully", "data": alcohol.id}
        )
    except Exception as e:
        alcohol_controller.db.session.rollback()
        return jsonify({"message": "Failed to update alcohol entry"}), 500


@alcohol_bp.route("/delete/<int:alcohol_id>", methods=["DELETE"])
def delete_alcohol(alcohol_id):
    user_id = request.args.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in request."}), 400

    alcohol = Alcohol.query.get(alcohol_id)

    if not alcohol:
        return jsonify({"message": "Alcohol entry not found"}), 404

    if alcohol.user_id != user_id:
        return (
            jsonify({"message": "Unauthorized. User ID does not match alcohol owner"}),
            403,
        )

    try:
        alcohol_controller.db.session.delete(alcohol)
        alcohol_controller.db.session.commit()
        return jsonify({"message": "Alcohol entry deleted successfully"})
    except Exception as e:
        alcohol_controller.db.session.rollback()
        return jsonify({"message": "Failed to delete alcohol entry"}), 500
