from flask_sqlalchemy import SQLAlchemy

db_user_data = SQLAlchemy()


class Goal(db_user_data.Model):
    __bind_key__ = "user_data"  # Specify the database key (matches the config key)

    __tablename__ = "goals"

    id = db_user_data.Column(db_user_data.Integer, primary_key=True)
    user_id = db_user_data.Column(
        db_user_data.Integer,
        db_user_data.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    goal_type = db_user_data.Column(db_user_data.String(50), nullable=False)
    attributes = db_user_data.Column(db_user_data.JSON)
    # Add other fields as needed

    def __init__(self, user_id, goal_type, attributes):
        self.user_id = user_id
        self.goal_type = goal_type
        self.attributes = attributes
