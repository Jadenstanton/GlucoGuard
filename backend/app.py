from flask import Flask
import sys
import logging

sys.path.append(r"C:\Users\Jaden\Desktop\Development\SeniorProject")
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from backend.api.routes.user_routes import user_bp
from backend.api.routes.activity_routes import activity_bp
from backend.api.routes.food_routes import food_bp
from backend.api.routes.alcohol_routes import alcohol_bp
from backend.api.routes.goal_routes import goal_bp
from backend.database.database import db, migrate
from config import DbConfig


def create_app():
    app = Flask(__name__)
    logging.basicConfig(filename="app.log", level=logging.DEBUG)
    app.config.from_object(DbConfig)

    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprint routes
    app.register_blueprint(user_bp)
    app.register_blueprint(activity_bp)
    app.register_blueprint(goal_bp)
    app.register_blueprint(food_bp)
    app.register_blueprint(alcohol_bp)

    with app.app_context():
        db.create_all()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
