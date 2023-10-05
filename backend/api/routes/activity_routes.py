from flask import Blueprint, request, jsonify
from ..controllers import activity_controller

activity_bp = Blueprint('activity', __name__, url_prefix='/api/activity')

@activity_bp.route('/create', methods=['POST'])
def create_activity():
    data = request.get_json()
    result = activity_controller.create_activity(data)
    return jsonify(result)

@activity_bp.route('/delete/<int:activity_id>', methods=['DELETE'])
def delete_activty(activity_id):
    result = activity_controller.delete_activity(activity_id)
    return jsonify(result)

@activity_bp.route('/update/<int:activity_id>', methods=['PUT'])
def update_activity(activity_id):
    data = request.get_json()
    result = activity_controller.update_activity(activity_id, data)
    return jsonify(result)

