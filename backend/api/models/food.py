from flask_sqlalchemy import SQLAlchemy

db_user_data = SQLAlchemy()


class Food(db_user_data.Model):
    __bind_key__ = "user_data"  # Associate the model with the user_data database

    __tablename__ = "foods"

    id = db_user_data.Column(db_user_data.Integer, primary_key=True)
    user_id = db_user_data.Column(
        db_user_data.Integer,
        db_user_data.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    food_name = db_user_data.Column(db_user_data.String(100), nullable=False)
    portion_size = db_user_data.Column(db_user_data.Float, nullable=False)
    nutritional_info = db_user_data.Column(db_user_data.JSON)
    # Add other fields as needed

    def __init__(self, user_id, food_name, portion_size, nutritional_info):
        self.user_id = user_id
        self.food_name = food_name
        self.portion_size = portion_size
        self.nutritional_info = nutritional_info
