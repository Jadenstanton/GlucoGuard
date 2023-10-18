from flask import Blueprint, request, jsonify
from ..controllers import user_controller
from ..models.user import User

user_controller = user_controller.UserController()

user_bp = Blueprint("user", __name__, url_prefix="/api/user")


@user_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    user = User(
        username=data.get("username"),
        email=data.get("email"),
        password=data.get("password"),
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
    result = user_controller.login(data)
    return jsonify(result)
