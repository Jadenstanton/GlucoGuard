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