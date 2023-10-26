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

    if data["activity_type"] not in [
        "active_zone_minutes",
        "activity",
        "breathing_rate",
        "heart_rate",
        "heart_rate_variability",
        "Sp02",
    ]:
        return jsonify({"message": "Invalid activity_type"}), 400

    activity = activity_controller.create_activity(user.id, data)

    try:
        activity_controller.db.session.add(activity)
        activity_controller.db.session.commit()
        return (
            jsonify({"message": "Activity created successfully", "data": activity.id}),
            201,
        )
    except Exception as e:
        activity_controller.db.session.rollback()
        return jsonify({"message": "Failed to create activity. Error" + str(e)}), 500


@activity_bp.route("/delete/<int:activity_id>", methods=["DELETE"])
def delete_activity(activity_id):
    user_id = request.args.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in request."}), 400

    user = UserProfile.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    activity = activity_controller.delete_activity(user.id, activity_id)

    try:
        activity_controller.db.session.delete(activity)
        activity_controller.db.session.commit()
        return jsonify({"message": "Activity deleted successfully"}), 200
    except Exception as e:
        activity_controller.db.session.rollback()
        return jsonify({"message": "Failed to delete activity. Error" + str(e)}), 500


@activity_bp.route("/update/<int:activity_id>", methods=["PUT"])
def update_activity(activity_id):
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None or "activity_type" not in data:
        return (
            jsonify({"message": "Missing user_id or activity in the request data."}),
            400,
        )

    user = UserProfile.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    if data["activity_type"] not in [
        "active_zone_minutes",
        "activity",
        "breathing_rate",
        "heart_rate",
        "heart_rate_variability",
        "Sp02",
    ]:
        return jsonify({"message": "Invalid activity_type"}), 400

    activity = activity_controller.update_activity(user.id, activity_id, data)

    try:
        activity_controller.db.session.commit()
        return (
            jsonify({"message": "Activity updated successfully", "data": activity.id}),
            200,
        )
    except Exception as e:
        activity_controller.db.session.rollback()
        return jsonify({"message": "Failed to update activity. Error" + str(e)}), 500
