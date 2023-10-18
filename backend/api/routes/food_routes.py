from flask import Blueprint, request, jsonify
from ..controllers import food_controller
from ..models.food import Food

food_controller = food_controller.FoodController()

food_bp = Blueprint("food", __name__, url_prefix="/api/food")


@food_bp.route("/create", methods=["POST"])
def create_food():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in the request data."}), 400

    if "food_name" not in data or "portion_size" not in data:
        return (
            jsonify({"message": "Food name and portion size are required fields"}),
            400,
        )

    food = Food(
        user_id=user_id,
        food_name=data.get("food_name"),
        portion_size=data.get("portion_size"),
        nutritional_info=data.get("nutritional_info"),
    )

    try:
        food_controller.db.session.add(food)
        food_controller.db.session.commit()
        return (
            jsonify({"message": "Food entry created successfully", "data": food.id}),
            201,
        )
    except Exception as e:
        food_controller.db.session.rollback()
        return jsonify({"message": "Failed to create food entry"}), 500


@food_bp.route("/update/<int:food_id>", methods=["PUT"])
def update_food(food_id):
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in the request data."}), 400

    if "food_name" not in data or "portion_size" not in data:
        return (
            jsonify({"message": "Food name and portion size are required fields"}),
            400,
        )

    food = Food.query.get(food_id)

    if not food:
        return jsonify({"message": "Food entry not found"}), 404

    if food.user_id != user_id:
        return (
            jsonify({"message": "Unauthorized. User ID does not match food owner"}),
            403,
        )

    food.food_name = data["food_name"]
    food.portion_size = data["portion_size"]
    food.nutritional_info = data.get("nutritional_info")

    try:
        food_controller.db.session.commit()
        return jsonify({"message": "Food entry updated successfully", "data": food.id})
    except Exception as e:
        food_controller.db.session.rollback()
        return jsonify({"message": "Failed to update food entry"}), 500


@food_bp.route("/delete/<int:food_id>", methods=["DELETE"])
def delete_food(food_id):
    user_id = request.args.get("user_id")

    if user_id is None:
        return jsonify({"message": "Missing user_id in request."}), 400

    food = Food.query.get(food_id)

    if not food:
        return jsonify({"message": "Food entry not found"}), 404

    if food.user_id != user_id:
        return (
            jsonify({"message": "Unauthorized. User ID does not match food owner"}),
            403,
        )

    try:
        food_controller.db.session.delete(food)
        food_controller.db.session.commit()
        return jsonify({"message": "Food entry deleted successfully"})
    except Exception as e:
        food_controller.db.session.rollback()
        return jsonify({"message": "Failed to delete food entry"}), 500
