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
        setIsLoading(true);
        const user_id = localStorage.getItem('userId');

        getAllFoods(user_id)
            .then(response => {
                if (response && response.data && Array.isArray(response.data)) {
                    setFoods({ data: response.data });
                    const lastItem = response.data[response.data.length - 1];
                    // console.log('last item:', lastItem);
                    setLastFoodItem(lastItem);
                } else {
                    setError('The response from getAllFoods is not structured as expected.');
                }
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
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
