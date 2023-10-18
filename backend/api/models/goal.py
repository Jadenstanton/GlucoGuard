from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Goal(db.Model):
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user_profiles.id"), nullable=False)
    goal_type = db.Column(db.String(50), nullable=False)
    attributes = db.Column(db.JSON)  # Assuming JSON data for attributes
    # Add other fields as needed

    def __init__(self, user_id, goal_type, attributes):
        self.user_id = user_id
        self.goal_type = goal_type
        self.attributes = attributes
