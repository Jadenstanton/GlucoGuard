import React from 'react';
import FoodEntry from './FoodEntry';
import './FoodEntryContainer.css'; 

const FoodEntryContainer = ({ onFoodSubmit, onRecipeSubmit }) => {
  return (
    <div className="food-entry-container">
      <FoodEntry onFoodSubmit={onFoodSubmit} onRecipeSubmit={onRecipeSubmit} />
    </div>
  );
};

export default FoodEntryContainer;
