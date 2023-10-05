from flask import Blueprint, request, jsonify
from ..controllers import user_controller

user_bp = Blueprint('user', __name__, url_prefix='/api/user')

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    result = user_controller.register(data)
    return jsonify(result)

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    result = user_controller.login(data)
    return jsonify(result)
