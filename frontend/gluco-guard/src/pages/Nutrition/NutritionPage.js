import React, { useState, useEffect } from 'react';
import { getAllFoods, addFood, addRecipe, updateFood, deleteFood } from '../../services/foodService';
import FoodListContainer from './FoodList/FoodListContainer';
import FoodEntryContainer from './FoodEntry/FoodEntryContainer';
import './NutritionPage.css';

const NutritionPage = () => {
    const [foods, setFoods] = useState([]);
  
    useEffect(() => {
      const user_id = localStorage.getItem('userId');
      getAllFoods(user_id)
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
          .then((response) => {
              if(Array.isArray(foods.data)) {
                  const newFood = response.data; // Extract the new food item
                  setFoods({
                      ...foods,
                      data: [...foods.data, newFood] // Add the new food item to the data array
                  });
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
        if (Array.isArray(foods.data)) {
            const newFood = response.data;
            setFoods({
              ...foods, 
              data: [...foods.data, newFood]
            });
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
      console.log('foods', foods);
      deleteFood(userId, foodId)
        .then(() => {
          if (Array.isArray(foods.data)){
            setFoods({
               ...foods,
            data: foods.data.filter((food) => food.id !== foodId)
            });
          }
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
  