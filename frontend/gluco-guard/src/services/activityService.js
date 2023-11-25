const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const addActivity = async (activityData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(activityData),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getAllActivities = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/view_activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
        });
        if (!response.ok) throw new Error('Error fetching activities');
        return await response.json();
    } catch (error) {
        // Handle or throw the error 
        throw error;
    }
};

export const updateActivity = async (activityId, activityData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activity/update/${activityId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activityData),
        });
        if (!response.ok) throw new Error('Error updating activity');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteActivity = async (userId, activityId) => {
    console.log('sDeleting activity with ID:', activityId);
    // console.log('sDeleting activity with uID:', userId);

    try {
        const response = await fetch(`${API_BASE_URL}/activity/delete/${activityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `${userId}`
            },
            body: JSON.stringify({ user_id: userId }),
        });
        if (!response.ok) throw new Error('Error deleting activity');
        return await response.json();
    } catch (error) {
        throw error;
    }
};