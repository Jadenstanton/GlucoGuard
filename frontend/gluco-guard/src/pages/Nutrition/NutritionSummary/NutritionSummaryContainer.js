import React from 'react';
import NutritionSummary from './NutritionSummary';
import './NutritionSummaryContainer.css';

const NutritionSummaryContainer = ({ foodItems }) => {
  return (
    <div className="summary-container">
      <NutritionSummary foodItems={foodItems.data} />
      {/* add more components or content here if needed */}
    </div>
  );
};

export default NutritionSummaryContainer;
