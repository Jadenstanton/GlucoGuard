import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import './NutritionSummary.css';

const NutritionSummary = ({ foodItems }) => {
  if (!Array.isArray(foodItems)) {
    return <FontAwesomeIcon icon={faArrowsSpin} spin />; // Handles undefined or non-array 'foodItems'
  }

  const summary = foodItems.reduce((acc, food) => {
    acc.calories += food.calories;
    acc.protein += food.protein_g;
    acc.fat += food.total_fat_g;
    acc.carbs += food.total_carbohydrate_g;
    return acc;
  }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

  return (
    <div className="nutrition-summary">
      <h2>Nutrition Summary</h2>
      <p>Total Calories: {summary.calories.toFixed(2)}</p>
      <p>Total Protein (g): {summary.protein.toFixed(2)}</p>
      <p>Total Fat (g): {summary.fat.toFixed(2)}</p>
      <p>Total Carbs (g): {summary.carbs.toFixed(2)}</p>
    </div>
  );
};

NutritionSummary.defaultProps = {
  foodItems: []
};

export default NutritionSummary;
