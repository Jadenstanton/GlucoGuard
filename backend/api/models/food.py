from flask_sqlalchemy import SQLAlchemy
from ...database.database import db


class Food(db.Model):
    # __bind_key__ = "user_data"  # Associate the model with the user_data database

    __tablename__ = "foods"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    food_name = db.Column(db.String(100), nullable=False)
    portion_size = db.Column(db.Float, nullable=False)
    nutritional_info = db.Column(db.JSON)
    # Add other fields as needed

    def __init__(self, user_id, food_name, portion_size, nutritional_info):
        self.user_id = user_id
        self.food_name = food_name
        self.portion_size = portion_size
        self.nutritional_info = nutritional_info
