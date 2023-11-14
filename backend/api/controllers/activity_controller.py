from ..models.activity import Activity, ActivityType


class ActivityController:
    def __init__(self, db):
        self.db = db

    def create_activity(self, user_id, data):
        required_fields = ["activity_type", "title", "description", "value"]
        if any(field not in data for field in required_fields):
            return {
                "message": "All fields are required: activity_type, title, description, value"
            }, 400

        activity_type = data["activity_type"]
        if activity_type not in [item.value for item in ActivityType]:
            return {"message": "Invalid activity type"}, 400

        try:
            value = float(data["value"])
        except ValueError:
            return {"message": "Invalid value for activity"}, 400

        new_activity = Activity(
            user_id=user_id,
            activity_type=activity_type,
            title=data["title"],
            description=data["description"],
            value=value,
        )

        try:
            self.db.session.add(new_activity)
            self.db.session.commit()
            return {
                "message": "Activity created successfully",
                "data": new_activity.serialize(),
            }, 201
        except Exception as e:
            self.db.session.rollback()
            return {"message": f"Failed to create activity. Error: {str(e)}"}, 500

    def delete_activity(self, user_id, activity_id):
        activity = Activity.query.get(activity_id)
        # print(f"Activity user_id: {activity.user_id}, Request user_id: {user_id}")
        # print(f"activity.user_id type: {activity.user_id}, value: {activity.user_id}")
        # print(f"Deleting activity with ID: {activity_id}")
        # activity = Activity.query.get(activity_id)
        # print(f"Retrieved activity: {activity}")

        if not activity:
            return {"message": "Activity not found"}, 404

        print(
            f"activity.user_id type: {type(activity.user_id)}, value: {activity.user_id}"
        )
        print(f"Request user_id type: {type(user_id)}, value: {user_id}")

        if activity.user_id != user_id:
            return {"message": "Permission denied"}, 403

        try:
            self.db.session.delete(activity)
            self.db.session.commit()
            return {"message": "Activity deleted successfully"}, 200
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to delete activity"}, 500

    def update_activity(self, user_id, activity_id, data):
        if "activity_type" not in data or "title" not in data or "value" not in data:
            return {
                "message": "Activity type, title, and value are required fields"
            }, 400

        activity = Activity.query.get(activity_id)
        if not activity:
            return {"message": "Activity not found"}, 404

        if activity.user_id != user_id:
            return {"message": "Permission denied"}, 403

        activity_type = data["activity_type"]
        if activity_type not in [item.value for item in ActivityType]:
            return {"message": "Invalid activity type"}, 400

        try:
            activity.activity_type = activity_type
            activity.title = data["title"]
            activity.description = data.get("description")
            activity.value = float(data["value"])

            self.db.session.commit()
            return {
                "message": "Activity updated successfully",
                "data": activity.serialize(),
            }, 200
        except ValueError:
            return {"message": "Invalid value for activity"}, 400
        except Exception as e:
            self.db.session.rollback()
            return {"message": f"Failed to update activity. Error: {str(e)}"}, 500
