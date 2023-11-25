import React, { createContext, useState, useEffect, useContext } from 'react';
import { format, parseISO } from "date-fns";
import { useNutritionContext } from './NutritionContext';
import { useActivityContext } from './ActivityContext';

export const CombinedActivityContext = createContext();
export const useCombinedActivityContext = () => useContext(CombinedActivityContext);



export const CombinedActivityProvider = ({ children }) => {
    const [combinedActivity, setCombinedActivity] = useState([]);

    const nutritionContext = useNutritionContext();
    const activityContext = useActivityContext();

    useEffect(() => {
        if (nutritionContext && activityContext) {
            const { foods } = nutritionContext;
            const { activities } = activityContext;

            if (Array.isArray(foods.data) && Array.isArray(activities)) {
                const updatedActivity = aggregateData(foods.data, activities);
                // console.log("Aggregated Data:", updatedActivity);
                setCombinedActivity(updatedActivity);
            }
        }
    }, [nutritionContext, activityContext]);

    // ... rest of the context setup
    const aggregateData = (foodData, activityData) => {
        let combinedData = {};

        // console.log("fooddata", foodData);
        // console.log('acdata', activityData);

        // Aggregate food data
        foodData.forEach(food => {
            const date = format(parseISO(food.created_at), 'yyyy-MM-dd');
            combinedData[date] = combinedData[date] || { foodCount: 0, activityCount: 0 };
            combinedData[date].foodCount++;
        });

        // Aggregate activity data
        activityData.forEach(activity => {
            const date = format(parseISO(activity.created_at), 'yyyy-MM-dd');
            combinedData[date] = combinedData[date] || { foodCount: 0, activityCount: 0 };
            combinedData[date].activityCount++;
        });
        // console.log('combined', combinedData);

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

