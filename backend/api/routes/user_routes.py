from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from ..controllers import user_controller
from ..models.user import UserProfile
from ...database.database import db
import logging

user_controller = user_controller.UserController(db)

user_bp = Blueprint("user", __name__, url_prefix="/api/user")


@user_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(
        data.get("password"), method="pbkdf2:sha256"
    )
    user = UserProfile(
        username=data.get("username"), email=data.get("email"), password=hashed_password
    )

    try:
        user_controller.db.session.add(user)
        user_controller.db.session.commit()
        return (
            jsonify({"message": "User registered successfully", "user_id": user.id}),
            201,
        )
    except Exception as e:
        user_controller.db.session.rollback()
        return jsonify({"message": "Failed to register user"}), 500


@user_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    # logging.info("Received login request with data: %s", data)
    result = user_controller.login(data)
    if isinstance(result, tuple) and len(result) == 2:
        return jsonify(result[0]), result[1]
    else:
        return jsonify(result)

    # logging.info("Login result: %s", result)
