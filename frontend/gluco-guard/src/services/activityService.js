const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Add a new activity
export const addActivity = async (activityData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch all activities for a given user
export const getAllActivities = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/view_activities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId }),
        });
        if (!response.ok) throw new Error('Error fetching activities');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Update an existing activity
export const updateActivity = async (activityId, activityData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/update/${activityId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData),
        });
        if (!response.ok) throw new Error('Error updating activity');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Delete an activity
export const deleteActivity = async (userId, activityId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/delete/${activityId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId }),
        });
        if (!response.ok) throw new Error('Error deleting activity');
        return await response.json();
    } catch (error) {
        throw error;
    }
};
