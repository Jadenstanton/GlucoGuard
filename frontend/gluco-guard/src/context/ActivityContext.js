import React, { createContext, useState, useEffect } from 'react';
import { getAllActivities } from '../services/activityService';

export const ActivityContext = createContext(null);

export const ActivityProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [lastActivity, setLastActivity] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const logActivity = (activity) => {
        setActivities([...activities, activity]);
    };
    console.log('Activities in provider:', activities);

    useEffect(() => {
        setIsLoading(true);
        const user_id = localStorage.getItem('userId');

        getAllActivities(user_id)
            .then(response => {
                if (response && response.data && Array.isArray(response.data)) {
                    setActivities(response.data);
                    const lastItem = response.data[response.data.length - 1];
                    // console.log('last item:', lastItem);
                    setLastActivity(lastItem);
                } else {
                    setError('The response from getAllActivities is not structured as expected.');
                }
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); // Empty dependency array ensures this runs once on mount.

    return (
        <ActivityContext.Provider value={{ activities, logActivity }}>
            {children}
        </ActivityContext.Provider>
    );
};