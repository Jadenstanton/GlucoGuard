from flask import Blueprint, request, jsonify
from ..controllers import goal_controller
from ..models.goal import Goal

goal_controller = goal_controller.GoalController()

goal_bp = Blueprint("goal", __name__, url_prefix="/api/goal")


@goal_bp.route("/goals", methods=["POST"])
def set_goal():
    data = request.get_json()
    user_id = data.get("user_id")
    goal_type = data.get("goal_type")
    attributes = data.get("attributes")

    if user_id is None or goal_type is None:
        return jsonify({"message": "Invalid data. Missing user_id or goal_type."}), 400

    goal = Goal(user_id=user_id, goal_type=goal_type, attributes=attributes)

    try:
        goal_controller.db.session.add(goal)
        goal_controller.db.session.commit()
        return jsonify({"message": "Goal set successfully", "data": goal.id}), 201
    except Exception as e:
        goal_controller.db.session.rollback()
        return jsonify({"message": "Failed to set goal"}), 500


@goal_bp.route("/goals/<int:goal_id>", methods=["GET"])
def get_goal(goal_id):
    user_id = request.args.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in the request parameters."}), 400

    goal = Goal.query.get(goal_id)

    if goal is None:
        return jsonify({"message": "Goal not found"}), 404

    if goal.user_id != user_id:
        return (
            jsonify({"message": "Unauthorized. User ID does not match goal owner"}),
            403,
        )

    return jsonify({"message": "Goal retrieved successfully", "data": goal.to_dict()})


@goal_bp.route("/goals/<int:goal_id>", methods=["PUT"])
def update_goal(goal_id):
    data = request.get_json()
    user_id = data.get("user_id")
    goal_type = data.get("goal_type")

    if user_id is None or goal_type is None:
        return jsonify({"message": "Invalid data. Missing user_id or goal_type"}), 400

    goal = Goal.query.get(goal_id)

    if goal is None:
        return jsonify({"message": "Goal not found or unauthorized"}), 404

    if goal.user_id != user_id:
        return (
            jsonify({"message": "Unauthorized. User ID does not match goal owner"}),
            403,
        )

    goal.goal_type = goal_type

    try:
        goal_controller.db.session.commit()
        return jsonify({"message": "Goal updated successfully", "data": goal.to_dict()})
    except Exception as e:
        goal_controller.db.session.rollback()
        return jsonify({"message": "Failed to update goal"}), 500


@goal_bp.route("/goals/<int:goal_id>", methods=["DELETE"])
def delete_goal(goal_id):
    user_id = request.args.get("user_id")
    if user_id is None:
        return jsonify({"message": "Missing user_id in the request parameters"}), 400

    goal = Goal.query.get(goal_id)

    if goal is None:
        return jsonify({"message": "Goal not found or unauthorized"}), 404

    if goal.user_id != user_id:
        return (
            jsonify({"message": "Unauthorized. User ID does not match goal owner"}),
            403,
        )

    try:
        goal_controller.db.session.delete(goal)
        goal_controller.db.session.commit()
        return jsonify({"message": "Goal deleted successfully"})
    except Exception as e:
        goal_controller.db.session.rollback()
        return jsonify({"message": "Failed to delete goal"}), 500
