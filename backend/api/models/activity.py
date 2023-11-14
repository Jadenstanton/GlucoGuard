from flask_sqlalchemy import SQLAlchemy
from enum import Enum
from datetime import datetime
from ...database.database import db


class ActivityType(Enum):
    ACTIVITY_ZONE_MINUTES = "ACTIVITY_ZONE_MINUTES"
    ACTIVITY = "ACTIVITY"
    BREATHING_RATE = "BREATHING_RATE"
    HEART_RATE = "HEART_RATE"
    HEART_RATE_VARIABILITY = "HEART_RATE_VARIABILITY"
    SP02 = "SP02"


class Activity(db.Model):
    # __bind_key__ = "user_data"  # Specify the database key (matches the config key)

    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user_profiles.id"), nullable=False)
    activity_type = db.Column(db.Enum(ActivityType), nullable=False)
    value = db.Column(db.Float, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "activity_type": self.activity_type.value,
            "title": self.title,
            "description": self.description,
            "value": self.value,
            "created_at": self.created_at.isoformat()
            if self.created_at
            else None,  # Format datetime in ISO format
        }

    def __init__(
        self, user_id, activity_type, value, title, description, created_at=None
    ):
        self.user_id = user_id
        self.activity_type = activity_type
        self.value = value
        self.title = title
        self.description = description
        if created_at:
            self.created_at = created_at
