from flask import Blueprint, request, jsonify
from ..controllers import activity_controller
from ..models.user import UserProfile
from ...database.database import db


activity_controller = activity_controller.ActivityController(db)

activity_bp = Blueprint("activity", __name__, url_prefix="/api/activity")


@activity_bp.route("/create", methods=["POST"])
def create_activity():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in the request data."}), 400

    user = UserProfile.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found."}), 404

    response, status_code = activity_controller.create_activity(user.id, data)
    return jsonify(response), status_code


@activity_bp.route("/delete/<int:activity_id>", methods=["DELETE"])
def delete_activity(activity_id):
    user_id = request.args.get("user_id")
    print(f"Deleting activity {activity_id} for user {user_id}")
    if user_id is None:
        return jsonify({"message": "Missing user_id in request."}), 400

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"message": "Invalid user_id. It must be an integer."}), 400

    response, status_code = activity_controller.delete_activity(user_id, activity_id)
    return jsonify(response), status_code


@activity_bp.route("/update/<int:activity_id>", methods=["PUT"])
def update_activity(activity_id):
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None:
        return (
            jsonify({"message": "Missing user_id or activity in the request data."}),
            400,
        )

    response, status_code = activity_controller.update_activity(
        user_id, activity_id, data
    )
    return jsonify(response), status_code


@activity_bp.route("/aggregate/<int:user_id>/<int:year>/<int:month>")
def aggregate(user_id, year, month):
    aggregated_data = activity_controller.aggregate_monthly_data(user_id, year, month)
    return jsonify(aggregated_data)
