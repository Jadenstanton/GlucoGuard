from ..models.alcohol import Alcohol


class AlcoholController:
    def __init__(self, db):
        self.db = db

    def create_alcohol(self, user_id, data):
        if not data:
            return {"message": "No data provided in the request"}, 400

        if "alcohol_type" not in data or "quantity" not in data:
            return {"message": "Alcohol type and quantity are required fields"}, 400

        alcohol = Alcohol(
            user_id=user_id,
            alcohol_type=data["alcohol_type"],
            quantity=data["quantity"],
        )

        try:
            self.db.session.add(alcohol)
            self.db.session.commit()
            return {
                "message": "Alcohol entry created successfully",
                "data": alcohol.id,
            }, 201
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to create alcohol entry"}, 500

    def delete_alcohol(self, user_id, alcohol_id):
        if not alcohol_id:
            return {"message": "Alcohol ID is required in the request parameters"}, 400

        alcohol = Alcohol.query.get(alcohol_id)

        if not alcohol:
            return {"message": "Alcohol entry not found"}, 404

        if alcohol.user_id != user_id:
            return {"message": "Permission denied"}, 403

        try:
            self.db.session.delete(alcohol)
            self.db.session.commit()
            return {"message": "Alcohol entry deleted successfully"}
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to delete alcohol entry"}, 500

    def update_alcohol(self, user_id, alcohol_id, data):
        if not alcohol_id:
            return {"message": "Alcohol ID is required in the request parameters"}, 400

        if not data:
            return {"message": "No data provided in the request"}, 400

        if "alcohol_type" not in data:
            return {"message": "Alcohol type is a required field"}, 400

        alcohol = Alcohol.query.get(alcohol_id)

        if not alcohol:
            return {"message": "Alcohol entry not found"}, 404

        if alcohol.user_id != user_id:
            return {"message": "Permission denied"}, 403

        alcohol.alcohol_type = data["alcohol_type"]
        alcohol.quantity = data.get("quantity")

        try:
            self.db.session.commit()
            return {"message": "Alcohol entry updated successfully", "data": alcohol.id}
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to update alcohol entry"}, 500
