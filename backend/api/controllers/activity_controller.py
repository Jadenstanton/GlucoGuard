from ..models.activity import Activity


class ActivityController:
    def __init__(self, db):
        self.db = db

    def create_activity(self, user_id, data):
        # Validation and error handling logic here
        if "title" not in data or "description" not in data:
            return {"message": "Title and description are required fields"}, 400

        activity = {
            "user_id": user_id,
            "title": data["title"],
            "descripton": data["description"],
        }

        try:
            self.db.session.add(activity)
            self.db.session.commit()
            return {"message": "Activity created successfully", "data": activity}, 201
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to create activity"}, 500

    def delete_activity(self, user_id, activity_id):
        # Validation and error handling logic here
        activity = Activity.query.get(activity_id)

        if not activity:
            return {"message": "Activity not found"}, 404

        if activity.user_id != user_id:
            return {"message": "Permission denied"}, 403

        try:
            self.db.session.delete(activity)
            self.db.session.commit()
            return {"message": "Activity deleted successfully"}
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to delete activity"}, 500

    def update_activity(self, user_id, activity_id, data):
        # Validation and erro logic
        if "title" not in data:
            return {"message": "Title is a required field"}, 400

        activity = Activity.query.get(activity_id)

        if not activity:
            return {"message": "Activity not found"}, 404

        if activity.user_id != user_id:
            return {"message": "Permission denied"}, 403

        activity.title = data["title"]
        activity.description = data.get("description")

        try:
            self.db.session.commit()
            return {"message": "Activity updated successfully", "data": activity}

        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to update activity"}, 500
