import React, { useState, useEffect } from 'react';
import { getAllFoods, addFood, updateFood, deleteFood } from '../../services/foodService';
import FoodListContainer from './FoodList/FoodListContainer';
import FoodEntryContainer from './FoodEntry/FoodEntryContainer';
import './NutritionPage.css';

const NutritionPage = () => {
    const [foods, setFoods] = useState([]);
  
    useEffect(() => {
      getAllFoods()
        .then(setFoods)
        .catch((error) => {
          console.error('Failed to load foods:', error);
        });
    }, []);
  
    const handleAddFood = (foodName) => {
        const userId = localStorage.getItem('userId');
      const foodData = { 
        ingredient: foodName,
        user_id: userId
    };
      addFood(foodData)
        .then((newFood) => setFoods([...foods, newFood]))
        .catch((error) => {
          console.error('Failed to add food:', error);
        });
    };
  
    const handleEditFood = (foodId, updatedFoodData) => {
      updateFood(foodId, updatedFoodData)
        .then((updatedFood) => {
          setFoods(foods.map((food) => (food.id === foodId ? updatedFood : food)));
        })
        .catch((error) => {
          console.error(`Failed to update food with ID ${foodId}:`, error);
        });
    };
  
    const handleDeleteFood = (foodId) => {
      deleteFood(foodId)
        .then(() => {
          setFoods(foods.filter((food) => food.id !== foodId));
        })
        .catch((error) => {
          console.error(`Failed to delete food with ID ${foodId}:`, error);
        });
    };
  
    // The onFoodSubmit prop for FoodEntryContainer is not defined yet,
    // use handleAddFood for it for now
    return (
      <div className="nutrition-page">
        <FoodEntryContainer onFoodSubmit={handleAddFood} />
        <FoodListContainer
          foods={foods}
          onEdit={handleEditFood}
          onDelete={handleDeleteFood}
        />
        {/* Other components for the nutrition page */}
      </div>
    );
  };
  
  export default NutritionPage;
  