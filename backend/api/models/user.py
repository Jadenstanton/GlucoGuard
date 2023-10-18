from flask_sqlalchemy import SQLAlchemy

db_user_profiles = SQLAlchemy()


class UserProfile(
    db_user_profiles.Model
):  # Associate the model with the user_profiles database
    __bind_key__ = "user_profiles"  # Define the database key (matches the config key)

    __tablename__ = "user_profiles"

    id = db_user_profiles.Column(db_user_profiles.Integer, primary_key=True)
    username = db_user_profiles.Column(
        db_user_profiles.String(80), unique=True, nullable=False
    )
    email = db_user_profiles.Column(
        db_user_profiles.String(120), unique=True, nullable=False
    )
    password = db_user_profiles.Column(db_user_profiles.String(255), nullable=False)
    # Add other fields as needed

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
