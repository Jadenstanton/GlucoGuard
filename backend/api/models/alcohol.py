from flask_sqlalchemy import SQLAlchemy
from ...database.database import db


class Alcohol(db.Model):
    # __bind_key__ = "user_data"  # Associate the model with the user_data database

    __tablename__ = "alcohol"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    alcohol_type = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    # Add other fields as needed

    def __init__(self, user_id, alcohol_type, quantity):
        self.user_id = user_id
        self.alcohol_type = alcohol_type
        self.quantity = quantity
