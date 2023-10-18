from flask_sqlalchemy import SQLAlchemy

db_user_data = SQLAlchemy()


class Activity(db_user_data.Model):
    __bind_key__ = "user_data"  # Specify the database key (matches the config key)

    __tablename__ = "activities"

    id = db_user_data.Column(db_user_data.Integer, primary_key=True)
    user_id = db_user_data.Column(
        db_user_data.Integer,
        db_user_data.ForeignKey("user_profiles.id"),
        nullable=False,
    )
    title = db_user_data.Column(db_user_data.String(100), nullable=False)
    description = db_user_data.Column(db_user_data.String(255))
    # Add other fields as needed

    def __init__(self, user_id, title, description):
        self.user_id = user_id
        self.title = title
        self.description = description
