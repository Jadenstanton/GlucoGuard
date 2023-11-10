from flask_sqlalchemy import SQLAlchemy
from enum import Enum
from ...database.database import db


class ActivityType(Enum):
    ACTIVITY_ZONE_MINUTES = "Active Zone Minutes"
    ACTIVITY = "Activity"
    BREATHING_RATE = "Breathing Rate"
    HEART_RATE = "Heart Rate"
    HEART_RATE_VARIABILITY = "Heart Rate Variability"
    SP02 = "Sp02"


class Activity(db.Model):
    # __bind_key__ = "user_data"  # Specify the database key (matches the config key)

    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    activity_type = db.Column(db.Enum(ActivityType), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))

    def __init__(self, user_id, activity_type, title, description):
        self.user_id = user_id
        self.activity_type = activity_type
        self.title = title
        self.description = description
