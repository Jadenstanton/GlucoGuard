import React from 'react';
import './NutritionSummary.css';

const NutritionSummary = ({ foodItems }) => {
    console.log('Received foodItems prop:', foodItems);

    // Ensure that foodItems is defined and is an array before attempting to calculate summary
    if (!foodItems || !Array.isArray(foodItems)) {
      console.error('foodItems is undefined or not an array:', foodItems);
      return <div>Loading...</div>; 
    }
  
 const summary = foodItems.reduce((acc, food) => {
    acc.calories += food.calories;
    acc.protein += food.protein_g;
    acc.fat += food.total_fat_g;
    acc.carbs += food.total_carbohydrate_g;
    return acc;
  }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

  // Render the summary
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
  
NutritionSummary.defaultProps= {
    foodItems: []
};
  export default NutritionSummary;
  