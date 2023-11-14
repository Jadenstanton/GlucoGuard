import React, { useState, useEffect } from 'react';
import { getAllFoods, addFood, addRecipe, updateFood, deleteFood } from '../../services/foodService';
import FoodListContainer from './FoodList/FoodListContainer';
import FoodEntryContainer from './FoodEntry/FoodEntryContainer';
import NutritionSummaryContainer from './NutritionSummary/NutritionSummaryContainer';
import NutritionChartContainer from './NutritionChart/NutritionChartContainer';
import { useNutritionContext } from '../../context/NutritionContext';
// import NutritionContainer from './NutritionContainer';
import './NutritionPage.css';

const NutritionPage = () => {
  const {
    foods, setFoods,
    setLastFoodItem,
    lastFoodItem,
    isLoading, setIsLoading,
    error, setError
  } = useNutritionContext();


  const handleAddFood = (foodName) => {
    const userId = localStorage.getItem('userId');
    const foodData = {
      ingredient: foodName,
      user_id: userId
    };
    addFood(foodData)
      .then((response) => {
        if (response.data) {
          setFoods(currentFoods => ({
            ...currentFoods,
            data: [...currentFoods.data, response.data]
          }));

          setLastFoodItem(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to add food:', error);
      });
  };

  const handleAddRecipe = (foodName, ingredients) => {
    const userId = localStorage.getItem('userId');
    const foodData = {
      title: foodName,
      user_id: userId,
      ingredients: ingredients
    };
    addRecipe(foodData)
      .then((response) => {
        if (response.data) {
          setFoods(currentFoods => ({
            ...currentFoods,
            data: [...currentFoods.data, response.data]
          }));

          setLastFoodItem(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to add recipe:', error);
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
    const userId = localStorage.getItem('userId');
    deleteFood(userId, foodId)
      .then(() => {
        setFoods(currentFoods => {
          const updatedFoodsData = currentFoods.data.filter((food) => food.id !== foodId);

          if (updatedFoodsData.length > 0) {
            const newLastFoodItem = updatedFoodsData[updatedFoodsData.length - 1];
            setLastFoodItem(newLastFoodItem);
          } else {
            setLastFoodItem(null);
          }

          return {
            ...currentFoods,
            data: updatedFoodsData
          };
        });
      })
      .catch((error) => {
        console.error(`Failed to delete food with ID ${foodId}:`, error);
      });
  };

  // The onFoodSubmit prop for FoodEntryContainer is not defined yet,
  // use handleAddFood for it for now
  return (
    <div className="nutrition-page">
      <FoodEntryContainer onFoodSubmit={handleAddFood} onRecipeSubmit={handleAddRecipe} />
      <div className="nutrition-layout">
        <NutritionSummaryContainer foodItems={foods} />
        <NutritionChartContainer foodItems={foods} />
      </div>


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
