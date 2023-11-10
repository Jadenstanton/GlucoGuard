from flask import Blueprint, request, jsonify
from config import EdamamConfig
from ..controllers import food_controller
from ..models.food import Food
from ...database.database import db
import requests
import logging

logging.basicConfig(level=logging.DEBUG)

food_controller_instance = food_controller.FoodController(db)

food_bp = Blueprint("food", __name__, url_prefix="/api/food")

EDAMAM_INDIVIDUAL_API_ENDPOINT = EdamamConfig.EDAMAM_INDIVIDUAL_API_ENDPOINT
EDAMAM_RECIPE_API_ENDPOINT = EdamamConfig.EDAMAM_RECIPE_API_ENDPOINT
EDAMAM_API_KEY = EdamamConfig.APP_KEY
EDAMAM_APP_ID = EdamamConfig.APP_ID


def fetch_nutritional_info_recipe(title, ingredients):
    headers = {"Content-Type": "application/json"}
    data = {"title": title, "ingr": ingredients}
    response = requests.post(
        f"{EDAMAM_RECIPE_API_ENDPOINT}?app_id={EDAMAM_APP_ID}&app_key={EDAMAM_API_KEY}",
        headers=headers,
        json=data,
    )

    logging.debug("Edamam API Response: %s", response.text)

    logging.debug("Edamam API Response Status Code: %s", response.status_code)
    logging.debug(f"Data fetched: {data}")

    if response.status_code != 200:
        return None

    return response.json()


def fetch_nutritional_info(ingredient):
    headers = {
        "Content-Type": "application/json",
    }

    params = {
        "app_id": EDAMAM_APP_ID,
        "app_key": EDAMAM_API_KEY,
        "nutrition-type": "logging",
        "ingr": ingredient,
    }

    response = requests.get(
        EDAMAM_INDIVIDUAL_API_ENDPOINT, headers=headers, params=params
    )
    logging.debug("Edamam API Response: %s", response.text)

    # Log the status code
    logging.debug("Edamam API Response Status Code: %s", response.status_code)
    # logging.debug(f"Data fetched: {data}")

    if response.status_code != 200:
        return None

    return response.json()


@food_bp.route("/view_foods", methods=["GET"])
def view_foods():
    foods = Food.query.all()
    food_list = [f.serialize() for f in foods]
    return jsonify(food_list)


@food_bp.route("/test", methods=["GET"])
def test_route():
    return jsonify({"message": "Test route is working!"}), 200


@food_bp.route("/create_recipe", methods=["POST"])
def create_recipe():
    data = request.get_json()
    user_id = data.get("user_id")
    title = data.get("title")
    ingredients = data.get("ingredients")
    portion_size = data.get("portion_size", "Not Defined")

    nutritional_info = fetch_nutritional_info_recipe(title, ingredients)

    if not nutritional_info:
        return jsonify({"message": "Failed to fetch nutritional info"}), 500

    food_data = {
        "food_name": title,
        "portion_size": portion_size,
        "nutritional_info": nutritional_info,
    }

    response, status_code = food_controller_instance.create_food(user_id, food_data)
    return jsonify(response), status_code


@food_bp.route("/create_individual_food", methods=["POST"])
def create_individual_food():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Invalid data provided"}), 400

    user_id = data.get("user_id")
    ingredient = data.get("ingredient")
    portion_size = data.get("portion_size", "Not Defined")

    if not user_id or not ingredient:
        return jsonify({"message": "User ID and ingredient are required"}), 400

    nutritional_info = fetch_nutritional_info(ingredient)

    if not nutritional_info:
        return jsonify({"message": "Failed to fetch nutritional info"}), 500

    food_data = {
        "food_name": ingredient,
        "portion_size": portion_size,
        "nutritional_info": nutritional_info,
    }

    response, status_code = food_controller_instance.create_food(user_id, food_data)
    return jsonify(response), status_code


@food_bp.route("/update_recipe/<int:food_id>", methods=["PUT"])
def update_recipe(food_id):
    data = request.get_json()
    user_id = data.get("user_id")
    title = data.get("title")
    ingredients = data.get("ingredients")

    nutritional_info = fetch_nutritional_info_recipe(title, ingredients)

    if not nutritional_info:
        return jsonify({"message": "Failed to fetch nutritional info"}), 500

    # Extracting fields from the nutritional_info
    food_data = {
        "food_name": title,
        "portion_size": "Not Defined",  # Defaulting to "Not Defined" for now
        "nutritional_info": nutritional_info,
    }

    response, status_code = food_controller_instance.update_food(
        user_id, food_id, food_data
    )
    return jsonify(response), status_code


@food_bp.route("/get/<int:food_id>", methods=["GET"])
def get_food(food_id):
    user_id = request.args.get("user_id")
    response, status_code = food_controller_instance.get_food(user_id, food_id)
    return jsonify(response), status_code


@food_bp.route("/update/<int:food_id>", methods=["PUT"])
def update_food(food_id):
    data = request.get_json()
    user_id = data.get("user_id")

    nutritional_info = fetch_nutritional_info(data.get("food_name"))
    if nutritional_info:
        data["nutritional_info"] = nutritional_info

    response, status_code = food_controller_instance.update_food(user_id, food_id, data)
    return jsonify(response), status_code


@food_bp.route("/delete/<int:food_id>", methods=["DELETE"])
def delete_food(food_id):
    user_id = request.args.get("user_id")
    response, status_code = food_controller_instance.delete_food(user_id, food_id)
    return jsonify(response), status_code
