from ..models.activity import Activity
from datetime import datetime, timedelta


class ActivityController:
    def __init__(self, db):
        self.db = db

    def aggregate_monthly_data(self, user_id, year, month):
        # Calculate the start and end of the month
        today = datetime.utcnow().date()
        month_start = today.replace(day=1)
        next_month_start = (month_start + timedelta(days=31)).replace(day=1)
        print(
            f"Aggregating data for user {user_id} from {month_start} to {next_month_start}"
        )

        # Query to get all of the current month's activities for the user
        activities = (
            self.db.session.query(Activity)
            .filter(
                Activity.user_id == user_id,
                Activity.created_at >= month_start,
                Activity.created_at < next_month_start,
            )
            .all()
        )
        print(f"Found {len(activities)} activities")

        # Initialize aggregation data structure
        aggregated_data = {
            "TOTAL_ACTIVITY_DURATION": sum(a.duration for a in activities),
            "TOTAL_ACTIVITY_ZONE_MINUTES": sum(
                a.activity_zone_minutes for a in activities
            ),
            "AVERAGE_HEART_RATE": (
                sum(a.heart_rate for a in activities) / len(activities)
            )
            if activities
            else 0,
            "AVERAGE_BREATHING_RATE": (
                sum(a.breathing_rate for a in activities) / len(activities)
            )
            if activities
            else 0,
            "AVERAGE_SPO2": (
                sum(a.sp02 for a in activities if a.sp02 is not None)
                / sum(1 for a in activities if a.sp02 is not None)
            )
            if any(a.sp02 for a in activities)
            else 0,
            "AVERAGE_HRV": (
                sum(a.hrv for a in activities if a.hrv is not None)
                / sum(1 for a in activities if a.hrv is not None)
            )
            if any(a.hrv for a in activities)
            else 0,
        }

        # Return the aggregated monthly data
        return aggregated_data

    def create_activity(self, user_id, data):
        required_fields = [
            "activity_type",
            "title",
            "description",
            "duration",
            "activity_zone_minutes",
            "heart_rate",
            "breathing_rate",
        ]

        # Check for the presence of all required fields
        if any(field not in data for field in required_fields):
            missing_fields = ", ".join(
                field for field in required_fields if field not in data
            )
            return {"message": f"All fields are required: {missing_fields}"}, 400

        activity_type = data["activity_type"]

        try:
            # Convert string fields to their appropriate types
            duration = int(data["duration"])
            activity_zone_minutes = int(data["activity_zone_minutes"])
            heart_rate = int(data["heart_rate"])
            breathing_rate = int(data["breathing_rate"])

            # Optional fields
            sp02 = float(data["sp02"]) if "sp02" in data else None
            hrv = float(data["hrv"]) if "hrv" in data else None

            # Create a new Activity instance with all fields
            new_activity = Activity(
                user_id=user_id,
                activity_type=activity_type,
                title=data["title"],
                description=data["description"],
                duration=duration,
                activity_zone_minutes=activity_zone_minutes,
                heart_rate=heart_rate,
                breathing_rate=breathing_rate,
                sp02=sp02,
                hrv=hrv,
            )

            # Add the new activity to the session and commit
            self.db.session.add(new_activity)
            self.db.session.commit()

            return {
                "message": "Activity created successfully",
                "data": new_activity.serialize(),
            }, 201

        except ValueError as e:
            # Handle ValueError if the conversion fails
            self.db.session.rollback()
            return {"message": f"Invalid value for activity. Error: {str(e)}"}, 400
        except Exception as e:
            # Handle other exceptions
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
        # Check for the presence of required fields
        required_fields = [
            "activity_type",
            "title",
            "duration",
            "activity_zone_minutes",
            "heart_rate",
            "breathing_rate",
        ]
        if any(field not in data for field in required_fields):
            missing_fields = ", ".join(
                field for field in required_fields if field not in data
            )
            return {"message": f"Missing required fields: {missing_fields}"}, 400

        # Retrieve the activity record
        activity = Activity.query.get(activity_id)
        if not activity:
            return {"message": "Activity not found"}, 404

        # Permission check
        if activity.user_id != user_id:
            return {"message": "Permission denied"}, 403

        # Update the activity record with new data
        try:
            activity.activity_type = data["activity_type"]
            activity.title = data["title"]
            activity.description = data.get(
                "description", activity.description
            )  # Keep existing if not provided
            activity.duration = int(data["duration"])
            activity.activity_zone_minutes = int(data["activity_zone_minutes"])
            activity.heart_rate = int(data["heart_rate"])
            activity.breathing_rate = int(data["breathing_rate"])
            # Update optional fields if provided
            if "sp02" in data:
                activity.sp02 = float(data["sp02"])
            if "hrv" in data:
                activity.hrv = float(data["hrv"])

            self.db.session.commit()
            return {
                "message": "Activity updated successfully",
                "data": activity.serialize(),
            }, 200

        except ValueError as e:
            self.db.session.rollback()
            return {"message": f"Invalid value for activity. Error: {str(e)}"}, 400
        except Exception as e:
            self.db.session.rollback()
            return {"message": f"Failed to update activity. Error: {str(e)}"}, 500
