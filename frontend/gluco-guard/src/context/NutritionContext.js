import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllFoods } from '../services/foodService';

const NutritionContext = createContext();

export const useNutritionContext = () => useContext(NutritionContext);

export const NutritionProvider = ({ children }) => {
    const [lastFoodItem, setLastFoodItem] = useState(null);
    const [foods, setFoods] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllFoods = async () => {
            setIsLoading(true);
            const user_id = localStorage.getItem('userId');
            try {
                const response = await getAllFoods(user_id);
                if (response && response.data && Array.isArray(response.data)) {
                    setFoods({ data: response.data });
                    setLastFoodItem(response.data[response.data.length - 1]);
                } else {
                    setError('The response from getAllFoods is not structured as expected.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllFoods();
    }, []); // Empty dependency array ensures this runs once on mount.

    const contextValue = {
        lastFoodItem,
        setLastFoodItem,
        foods,
        setFoods,
        isLoading,
        setIsLoading,
        error,
        setError,
    };

    return (
        <NutritionContext.Provider value={contextValue}>
            {children}
        </NutritionContext.Provider>
    );
};
