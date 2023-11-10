from flask_sqlalchemy import SQLAlchemy
from ...database.database import db


class UserProfile(db.Model):
    # __bind_key__ = "user_data"  # Define the database key (matches the config key)

    __tablename__ = "user_profiles"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
