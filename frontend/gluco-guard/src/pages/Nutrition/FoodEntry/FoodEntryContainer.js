import React from 'react';
import FoodEntry from './FoodEntry';
import './FoodEntryContainer.css'; 

const FoodEntryContainer = ({ onFoodSubmit }) => {
  return (
    <div className="food-entry-container">
      <FoodEntry onFoodSubmit={onFoodSubmit} />
    </div>
  );
};

export default FoodEntryContainer;
