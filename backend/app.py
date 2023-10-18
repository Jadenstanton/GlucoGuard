from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .api.routes.user_routes import user_bp
from .api.routes.activity_routes import activity_bp
from .api.routes.goal_routes import goal_bp

app = Flask(__name__)

# Register blueprint routes
app.register_blueprint(user_bp)
app.register_blueprint(activity_bp)
app.register_blueprint(goal_bp)

# Initialize SQLAlchemy instances for the two databases
db_user_profiles = SQLAlchemy(
    app, session_options={"autocommit": True, "autoflush": False}
)
db_user_data = SQLAlchemy(app, session_options={"autocommit": True, "autoflush": False})

# TODO
# Finish setting up db and models
app.config[
    "SQLALCHEMY_DATABASE_URI_USER_PROFILES"
] = "sqlite:///./database/user_profiles.db"
app.config["SQLALCHEMY_DATABASE_URI_USER_DATA"] = "sqlite:///./database/user_data.db"

if __name__ == "__main__":
    app.run(debug=True)
