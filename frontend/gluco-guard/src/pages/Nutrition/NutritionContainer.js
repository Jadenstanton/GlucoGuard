import React from 'react';
import NutritionSummary from './NutritionSummary/NutritionSummary';
import NutritionChart from './NutritionChart/NutritionChart';
import './NutritionContainer.css';

const NutritionContainer = ({ foods }) => {

  return (
    <div className="nutrition-container">
      <NutritionSummary foodItems={foods} />
      <NutritionChart foodItems={foods} />
    </div>
  );
};

export default NutritionContainer;
