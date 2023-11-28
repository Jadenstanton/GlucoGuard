import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllActivities, updateActivity, deleteActivity } from '../services/activityService';

export const ActivityContext = createContext(null);
export const useActivityContext = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activityEvaluation, setActivityEvaluation] = useState({
        activeZone: { level: 'low', average: 0 },
        breathingRate: { level: 'low', average: 0 },
        heartRate: { level: 'low', average: 0 }
    });

    // Function to fetch and update activities data
    const fetchAndUpdateActivities = async () => {
        setIsLoading(true);
        const user_id = localStorage.getItem('userId');
        try {
            const response = await getAllActivities(user_id);
            if (response && response.data && Array.isArray(response.data)) {
                setActivities(response.data);
                updateEvaluation(response.data);
            } else {
                setError('The response from getAllActivities is not structured as expected.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logActivity = async (activity) => {
        const activityExists = activities.some(a => a.id === activity.id);
        if (!activityExists) {
            setActivities(prevActivities => {
                return [...prevActivities, activity];
            });
        }
        await fetchAndUpdateActivities();
    };


    const handleDelete = async (activityId) => {
        setIsLoading(true);
        const user_id = localStorage.getItem('userId');
        try {
            const response = await deleteActivity(user_id, activityId);
            if (response && response.message) {
                await fetchAndUpdateActivities();
            } else {
                setError('Error deleting activity.');
            }
        } catch (err) {
            setError(err.message || 'Failed to delete activity.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (activityId, updatedActivity) => {
        setIsLoading(true);
        try {
            const response = await updateActivity(activityId, updatedActivity);
            if (response && response.success) {
                await fetchAndUpdateActivities();
            } else {
                setError('Error updating activity.');
            }
        } catch (err) {
            setError(err.message || 'Failed to update activity.');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateAverages = (activities) => {
        let totalActiveZone = 0, totalBreathingRate = 0, totalHeartRate = 0;
        activities.forEach(activity => {
            totalActiveZone += activity.duration;
            totalBreathingRate += activity.breathing_rate;
            totalHeartRate += activity.heart_rate;
        });

        const dayCount = daysInMonth(new Date());

        return {
            activeZone: totalActiveZone / dayCount,
            breathingRate: totalBreathingRate / dayCount,
            heartRate: totalHeartRate / dayCount
        };
    };

    const evaluateMetric = (average, metricThresholds) => {
        if (average < metricThresholds.low) return 'low';
        if (average >= metricThresholds.low && average <= metricThresholds.high) return 'medium';
        return 'high';
    };

    const updateEvaluation = (currentActivities) => {
        const averages = calculateAverages(currentActivities);
        const evaluation = {
            activeZone: {
                level: evaluateMetric(averages.activeZone, { low: 400, high: 600 }),
                average: averages.activeZone
            },
            breathingRate: {
                level: evaluateMetric(averages.breathingRate, { low: 10, high: 12 }),
                average: averages.breathingRate
            },
            heartRate: {
                level: evaluateMetric(averages.heartRate, { low: 55, high: 60 }),
                average: averages.heartRate
            }
        };
        setActivityEvaluation(evaluation);
    };

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    useEffect(() => {
        fetchAndUpdateActivities();
    }, []);

    const contextValue = {
        activities,
        isLoading,
        error,
        activityEvaluation,
        logActivity,
        handleDelete,
        handleEdit
    };

    return (
        <ActivityContext.Provider value={contextValue}>
            {children}
        </ActivityContext.Provider>
    );
};

export default ActivityProvider;
