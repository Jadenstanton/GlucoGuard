from flask import Blueprint, request, jsonify
from ..controllers import activity_controller
from ..models.user import UserProfile

activity_controller = activity_controller.ActivityController()

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

    result = activity_controller.create_activity(user.id, data)
    return jsonify(result)


@activity_bp.route("/delete/<int:activity_id>", methods=["DELETE"])
def delete_activty(activity_id):
    user_id = request.args.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in request."}), 400

    user = UserProfile.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    result = activity_controller.delete_activity(user.id, activity_id)
    return jsonify(result)


@activity_bp.route("/update/<int:activity_id>", methods=["PUT"])
def update_activity(activity_id):
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in the request data."}), 400

    user = UserProfile.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    result = activity_controller.update_activity(user.id, activity_id, data)
    return jsonify(result)
