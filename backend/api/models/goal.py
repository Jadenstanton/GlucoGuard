from flask_sqlalchemy import SQLAlchemy
from ...database.database import db


class Goal(db.Model):
    # __bind_key__ = "user_data"  # Specify the database key (matches the config key)

    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    goal_type = db.Column(db.String(50), nullable=False)
    attributes = db.Column(db.JSON)

    def __init__(self, user_id, goal_type, attributes):
        self.user_id = user_id
        self.goal_type = goal_type
        self.attributes = attributes

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "goal_type": self.goal_type,
            "attributes": self.attributes,
        }
