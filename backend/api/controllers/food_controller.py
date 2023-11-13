from ..models.food import Food
from flask import request
import logging
import json


class FoodController:
    def __init__(self, db):
        self.db = db

    def create_food(self, user_id, data):
        if not data:
            return {"message": "No data provided in the request"}, 400

        print(json.dumps(data, indent=4))

        if "food_name" not in data or "portion_size" not in data:
            return {"message": "Food name and portion size are required fields"}, 400

        if data["portion_size"] == "Not Defined":
            data["portion_size"] = 0

        def get_nutrient_value(key):
            total_nutrients_data = data.get("nutritional_info", {}).get(
                "totalNutrients", {}
            )
            if key in total_nutrients_data:
                return total_nutrients_data[key].get("quantity", None)

            return data.get("nutritional_info", {}).get(key, None)

        calories = get_nutrient_value("calories")
        total_fat_g = get_nutrient_value("FAT")
        saturated_fat_g = get_nutrient_value("FASAT")
        trans_fat_g = get_nutrient_value("FATRN")
        cholesterol_mg = get_nutrient_value("CHOLE")
        sodium_mg = get_nutrient_value("NA")
        total_carbohydrate_g = get_nutrient_value("CHOCDF")
        dietary_fiber_g = get_nutrient_value("FIBTG")
        total_sugars_g = get_nutrient_value("SUGAR")
        protein_g = get_nutrient_value("PROCNT")
        vitamin_d_ug = get_nutrient_value("VITD")
        calcium_mg = get_nutrient_value("CA")
        iron_mg = get_nutrient_value("FE")
        potassium_mg = get_nutrient_value("K")

        # Create a new Food entry
        new_food_entry = Food(
            user_id=user_id,
            food_name=data["food_name"],
            portion_size=data["portion_size"],
            calories=calories,
            total_fat_g=total_fat_g,
            saturated_fat_g=saturated_fat_g,
            trans_fat_g=trans_fat_g,
            cholesterol_mg=cholesterol_mg,
            sodium_mg=sodium_mg,
            total_carbohydrate_g=total_carbohydrate_g,
            dietary_fiber_g=dietary_fiber_g,
            total_sugars_g=total_sugars_g,
            protein_g=protein_g,
            vitamin_d_ug=vitamin_d_ug,
            calcium_mg=calcium_mg,
            iron_mg=iron_mg,
            potassium_mg=potassium_mg,
        )
        logging.debug("Attempting to add food entry to the database.")
        try:
            self.db.session.add(new_food_entry)
            self.db.session.commit()
            return {
                "message": "Food entry created successfully",
                "data": new_food_entry.to_dict(),
            }, 201
        except Exception as e:
            self.db.session.rollback()
            return {"message": f"Failed to create food entry. Error:{e}"}, 500

    def delete_food(self, food_id):
        if not food_id:
            return {"message": "Food ID is required in the request parameters"}, 400

        user_id = request.headers.get("Authorization")
        if not user_id:
            return {"message": "User ID is required"}, 401

        food = Food.query.get(food_id)
        # print("foodid", food.user_id)
        # print("uid", user_id)

        if not food:
            return {"message": "Food entry not found"}, 404

        # print(f"Comparing food.user_id: {food.user_id} with user_id: {user_id}")
        # print(
        #     f"Type of food.user_id: {type(food.user_id)}, Type of user_id: {type(user_id)}"
        # )

        if food.user_id != int(user_id):
            # print("Permission denied triggered")
            return {"message": "Permission denied"}, 403

        try:
            self.db.session.delete(food)
            self.db.session.commit()
            return {"message": "Food entry deleted successfully"}, 200
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to delete food entry"}, 500

    def update_food(self, user_id, food_id, data):
        if not food_id:
            return {"message": "Food ID is required in the request parameters"}, 400

        if not data:
            return {"message": "No data provided in the request"}, 400

        food = Food.query.get(food_id)

        if not food:
            return {"message": "Food entry not found"}, 404

        if food.user_id != user_id:
            return {"message": "Permission denied"}, 403

        food.food_name = data["food_name"]
        food.portion_size = data.get("portion_size")
        nutritional_info = data.get("nutritional_info", {})

        for key, value in nutritional_info.items():
            if hasattr(food, key):  # Check if attribute exists before setting it
                setattr(food, key, value)
        try:
            self.db.session.commit()
            return {"message": "Food entry updated successfully", "data": food.id}
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to update food entry"}, 500

    def get_food(self, user_id, food_id):
        if not food_id:
            return {"message": "Food ID is required in the request parameters"}, 400

        food = Food.query.get(food_id)

        if not food:
            return {"message": "Food entry not found"}, 404

        if food.user_id != user_id:
            return {"message": "Permission denied"}, 403

        response = {
            "message": "Food entry retrieved successfully",
            "data": food.to_dict(),
        }
        return response, 200

    def get_all_foods(self, user_id):
        # Retrieve all food entries
        all_foods = Food.query.filter_by(user_id=user_id).all()

        # Check if any food entries exist for the user
        if not all_foods:
            return {"message": "No food entries found for the user"}, 404

        # Prepare response data
        food_list = [food.to_dict() for food in all_foods]
        response = {
            "message": "All food entries retrieved successfully",
            "data": food_list,
        }

        return response, 200
