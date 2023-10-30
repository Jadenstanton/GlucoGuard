from ..models.food import Food


class FoodController:
    def __init__(self, db):
        self.db = db

    def create_food(self, user_id, data):
        if not data:
            return {"message": "No data provided in the request"}, 400

        if "food_name" not in data or "portion_size" not in data:
            return {"message": "Food name and portion size are required fields"}, 400

        food = Food(
            user_id=user_id,
            food_name=data["food_name"],
            portion_size=data["portion_size"],
            nutritional_info=data.get("nutritional_info"),
        )

        try:
            self.db.session.add(food)
            self.db.session.commit()
            return {"message": "Food entry created successfully", "data": food.id}, 201
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to create food entry"}, 500

    def delete_food(self, user_id, food_id):
        if not food_id:
            return {"message": "Food ID is required in the request parameters"}, 400

        food = Food.query.get(food_id)

        if not food:
            return {"message": "Food entry not found"}, 404

        if food.user_id != user_id:
            return {"message": "Permission denied"}, 403

        try:
            self.db.session.delete(food)
            self.db.session.commit()
            return {"message": "Food entry deleted successfully"}
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to delete food entry"}, 500

    def update_food(self, user_id, food_id, data):
        if not food_id:
            return {"message": "Food ID is required in the request parameters"}, 400

        if not data:
            return {"message": "No data provided in the request"}, 400

        if "food_name" not in data:
            return {"message": "Food name is a required field"}, 400

        food = Food.query.get(food_id)

        if not food:
            return {"message": "Food entry not found"}, 404

        if food.user_id != user_id:
            return {"message": "Permission denied"}, 403

        food.food_name = data["food_name"]
        food.portion_size = data.get("portion_size")
        food.nutritional_info = data.get("nutritional_info")

        try:
            self.db.session.commit()
            return {"message": "Food entry updated successfully", "data": food.id}
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to update food entry"}, 500
