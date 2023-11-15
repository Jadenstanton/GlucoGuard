from flask_sqlalchemy import SQLAlchemy
from enum import Enum
from datetime import datetime
from ...database.database import db


class Activity(db.Model):
    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user_profiles.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    activity_type = db.Column(
        db.String(100), nullable=False
    )  # E.g., "Walking", "Running", etc.
    activity_zone_minutes = db.Column(
        db.Integer, nullable=False
    )  # Duration in the activity zone in minutes
    duration = db.Column(db.Integer, nullable=False)  # Total duration in minutes
    heart_rate = db.Column(db.Integer, nullable=False)  # Heart rate in beats per minute
    breathing_rate = db.Column(
        db.Integer, nullable=False
    )  # Breathing rate in breaths per minute
    sp02 = db.Column(db.Float, nullable=True)  # SpO2 percentage
    hrv = db.Column(db.Float, nullable=True)  # Heart rate variability in milliseconds
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "activity_type": self.activity_type,
            "activity_zone_minutes": self.activity_zone_minutes,
            "duration": self.duration,
            "heart_rate": self.heart_rate,
            "breathing_rate": self.breathing_rate,
            "sp02": self.sp02,
            "hrv": self.hrv,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __init__(
        self,
        user_id,
        title,
        description,
        activity_type,
        activity_zone_minutes,
        duration,
        heart_rate,
        breathing_rate,
        sp02=None,
        hrv=None,
        created_at=None,
    ):
        self.user_id = user_id
        self.title = title
        self.description = description
        self.activity_type = activity_type
        self.activity_zone_minutes = activity_zone_minutes
        self.duration = duration
        self.heart_rate = heart_rate
        self.breathing_rate = breathing_rate
        self.sp02 = sp02
        self.hrv = hrv
        if created_at:
            self.created_at = created_at
