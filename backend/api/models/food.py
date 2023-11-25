from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from ...database.database import db


class Food(db.Model):
    __tablename__ = "foods"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user_profiles.id"),
        nullable=False,
    )

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    food_name = db.Column(db.String(100), nullable=False)
    portion_size = db.Column(db.Float, nullable=False)

    # Nutritional Information
    calories = db.Column(db.Float)
    total_fat_g = db.Column(db.Float)
    saturated_fat_g = db.Column(db.Float)
    trans_fat_g = db.Column(db.Float)
    cholesterol_mg = db.Column(db.Float)
    sodium_mg = db.Column(db.Float)
    total_carbohydrate_g = db.Column(db.Float)
    dietary_fiber_g = db.Column(db.Float)
    total_sugars_g = db.Column(db.Float)
    protein_g = db.Column(db.Float)
    vitamin_d_ug = db.Column(db.Float)
    calcium_mg = db.Column(db.Float)
    iron_mg = db.Column(db.Float)
    potassium_mg = db.Column(db.Float)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "food_name": self.food_name,
            "portion_size": self.portion_size,
            "calories": self.calories,
            "total_fat_g": self.total_fat_g,
            "saturated_fat_g": self.saturated_fat_g,
            "trans_fat_g": self.trans_fat_g,
            "cholesterol_mg": self.cholesterol_mg,
            "sodium_mg": self.sodium_mg,
            "total_carbohydrate_g": self.total_carbohydrate_g,
            "dietary_fiber_g": self.dietary_fiber_g,
            "total_sugars_g": self.total_sugars_g,
            "protein_g": self.protein_g,
            "vitamin_d_ug": self.vitamin_d_ug,
            "calcium_mg": self.calcium_mg,
            "iron_mg": self.iron_mg,
            "potassium_mg": self.potassium_mg,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    # Constructor
    def __init__(self, user_id, food_name, portion_size, created_at=None, **kwargs):
        self.user_id = user_id
        self.food_name = food_name
        self.portion_size = portion_size
        self.calories = kwargs.get("calories")
        self.total_fat_g = kwargs.get("total_fat_g")
        self.saturated_fat_g = kwargs.get("saturated_fat_g")
        self.trans_fat_g = kwargs.get("trans_fat_g")
        self.cholesterol_mg = kwargs.get("cholesterol_mg")
        self.sodium_mg = kwargs.get("sodium_mg")
        self.total_carbohydrate_g = kwargs.get("total_carbohydrate_g")
        self.dietary_fiber_g = kwargs.get("dietary_fiber_g")
        self.total_sugars_g = kwargs.get("total_sugars_g")
        self.protein_g = kwargs.get("protein_g")
        self.vitamin_d_ug = kwargs.get("vitamin_d_ug")
        self.calcium_mg = kwargs.get("calcium_mg")
        self.iron_mg = kwargs.get("iron_mg")
        self.potassium_mg = kwargs.get("potassium_mg")
        if created_at:
            self.created_at = created_at

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "food_name": self.food_name,
            "portion_size": self.portion_size,
            "calories": self.calories,
            "total_fat_g": self.total_fat_g,
            "saturated_fat_g": self.saturated_fat_g,
            "trans_fat_g": self.trans_fat_g,
            "cholesterol_mg": self.cholesterol_mg,
            "sodium_mg": self.sodium_mg,
            "total_carbohydrate_g": self.total_carbohydrate_g,
            "dietary_fiber_g": self.dietary_fiber_g,
            "total_sugars_g": self.total_sugars_g,
            "protein_g": self.protein_g,
            "vitamin_d_ug": self.vitamin_d_ug,
            "calcium_mg": self.calcium_mg,
            "iron_mg": self.iron_mg,
            "potassium_mg": self.potassium_mg,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
