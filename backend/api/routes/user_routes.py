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
    result = user_controller.register(data)
    if isinstance(result, tuple) and len(result) == 2:
        return jsonify(result[0]), result[1]
    else:
        return jsonify(result)


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


@user_bp.route("/check-username", methods=["POST"])
def check_username():
    data = request.get_json()
    username = data.get("username")
    is_available = user_controller.check_username_availability(username)
    return jsonify(isAvailable=is_available)


@user_bp.route("/check-email", methods=["POST"])
def check_email():
    data = request.get_json()
    email = data.get("email")
    is_available = user_controller.check_email_availability(email)
    return jsonify(isAvailable=is_available)
