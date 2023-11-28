import React, { createContext, useState, useEffect, useContext } from 'react';
import { format, parseISO } from "date-fns";
import { useNutritionContext } from './NutritionContext';
import { useActivityContext } from './ActivityContext';

export const CombinedActivityContext = createContext();
export const useCombinedActivityContext = () => useContext(CombinedActivityContext);

export const CombinedActivityProvider = ({ children }) => {
    const [combinedActivity, setCombinedActivity] = useState([]);
    const { foods } = useNutritionContext();
    const { activities } = useActivityContext();

    useEffect(() => {
        if (foods && activities) {
            const updatedActivity = aggregateData(foods.data, activities);
            setCombinedActivity(updatedActivity);
        }
    }, [foods, activities]);

    const aggregateData = (foodData, activityData) => {
        let combinedData = {};

        foodData.forEach(food => {
            const date = format(parseISO(food.created_at), 'yyyy-MM-dd');
            combinedData[date] = combinedData[date] || { foodCount: 0, activityCount: 0 };
            combinedData[date].foodCount++;
        });

        activityData.forEach(activity => {
            const date = format(parseISO(activity.created_at), 'yyyy-MM-dd');
            combinedData[date] = combinedData[date] || { foodCount: 0, activityCount: 0 };
            combinedData[date].activityCount++;
        });

        return Object.keys(combinedData).map(date => ({
            date,
            foodCount: combinedData[date].foodCount,
            activityCount: combinedData[date].activityCount
        }));
    };

    return (
        <CombinedActivityContext.Provider value={{ combinedActivity }}>
            {children}
        </CombinedActivityContext.Provider>
    );
};
