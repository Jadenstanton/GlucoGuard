from flask_sqlalchemy import SQLAlchemy
from ...database.database import db


class Activity(db.Model):
    # __bind_key__ = "user_data"  # Specify the database key (matches the config key)

    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    # Add other fields as needed

    def __init__(self, user_id, title, description):
        self.user_id = user_id
        self.title = title
        self.description = description
