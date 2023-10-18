from flask_sqlalchemy import SQLAlchemy

db_user_data = SQLAlchemy()


class Alcohol(db_user_data.Model):
    __bind_key__ = "user_data"  # Associate the model with the user_data database

    __tablename__ = "alcohol"

    id = db_user_data.Column(db_user_data.Integer, primary_key=True)
    user_id = db_user_data.Column(
        db_user_data.Integer,
        db_user_data.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    alcohol_type = db_user_data.Column(db_user_data.String(100), nullable=False)
    quantity = db_user_data.Column(db_user_data.Float, nullable=False)
    # Add other fields as needed

    def __init__(self, user_id, alcohol_type, quantity):
        self.user_id = user_id
        self.alcohol_type = alcohol_type
        self.quantity = quantity
