import React from 'react';
import { useNutritionContext } from '../../context/NutritionContext';
import { addFood, addRecipe, updateFood, deleteFood } from '../../services/foodService';

import FoodEntryContainer from './FoodEntry/FoodEntryContainer';
import FoodListContainer from './FoodList/FoodListContainer';
import NutritionSummaryContainer from './NutritionSummary/NutritionSummaryContainer';
import NutritionChartContainer from './NutritionChart/NutritionChartContainer';
import './NutritionPage.css';

const NutritionPage = () => {
  const { foods, setFoods, setLastFoodItem } = useNutritionContext();

  // Handle adding of new food
  const handleAddFood = async (foodName) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await addFood({ ingredient: foodName, user_id: userId });
      if (response.data) {
        setFoods(currentFoods => ({ ...currentFoods, data: [...currentFoods.data, response.data] }));
        setLastFoodItem(response.data);
      }
    } catch (error) {
      console.error('Failed to add food:', error);
    }
  };

  // Handle adding of new recipe
  const handleAddRecipe = async (foodName, ingredients) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await addRecipe({ title: foodName, user_id: userId, ingredients });
      if (response.data) {
        setFoods(currentFoods => ({ ...currentFoods, data: [...currentFoods.data, response.data] }));
        setLastFoodItem(response.data);
      }
    } catch (error) {
      console.error('Failed to add recipe:', error);
    }
  };

  // Handle editing of food
  const handleEditFood = async (foodId, updatedFoodData) => {
    try {
      const updatedFood = await updateFood(foodId, updatedFoodData);
      setFoods(foods.map(food => (food.id === foodId ? updatedFood : food)));
    } catch (error) {
      console.error(`Failed to update food with ID ${foodId}:`, error);
    }
  };

  // Handle deletion of food
  const handleDeleteFood = async (foodId) => {
    try {
      const userId = localStorage.getItem('userId');
      await deleteFood(userId, foodId);
      setFoods(currentFoods => {
        const updatedFoodsData = currentFoods.data.filter(food => food.id !== foodId);
        setLastFoodItem(updatedFoodsData.length > 0 ? updatedFoodsData[updatedFoodsData.length - 1] : null);
        return { ...currentFoods, data: updatedFoodsData };
      });
    } catch (error) {
      console.error(`Failed to delete food with ID ${foodId}:`, error);
    }
  };

  return (
    <div className="nutrition-page">
      <FoodEntryContainer onFoodSubmit={handleAddFood} onRecipeSubmit={handleAddRecipe} />
      <div className="nutrition-layout">
        <NutritionSummaryContainer foodItems={foods} />
        <NutritionChartContainer foodItems={foods} />
      </div>
      <FoodListContainer foods={foods} onEdit={handleEditFood} onDelete={handleDeleteFood} />
    </div>
  );
};

export default NutritionPage;
