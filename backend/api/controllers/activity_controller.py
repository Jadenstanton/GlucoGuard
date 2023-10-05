# Replace with actual db interactions
activities = []

def create_activity(data):
    # TODO
    # Validation and error handling logic here
    activity = {
        'title': data['title'],
        'descripton': data['description']
    }
    activities.append(activity)
    return {'message': 'Activity created successfully'}

def delete_activity(activity_id):
    # Validation and error handling logic here
    if not isinstance(activity_id, int):
        return {'message': 'Invalid activity ID'}, 400

    activity =  next((activity for activity in activities if activity.get('id') == activity_id), None)
    if activity:
        activities.remove(activity)
        return {'message': 'Activity deleted successfully'}
    else:
        return {'message': 'Activity not found'}, 404
    
def update_activity(activity_id, data):
    # Validation and erro logic
    if not isinstance(activity_id, int):
        return {'message': 'Invalid activity ID'}, 400
    activity =  next((activity for activity in activities if activity.get('id') == activity_id), None)
    if activity:
        activity['title'] = data['title']
        activity['description'] = data['description']
        return {'message': 'Activity updated successfully'}
    else:
        return {'message': "Activity not found"}, 404
    