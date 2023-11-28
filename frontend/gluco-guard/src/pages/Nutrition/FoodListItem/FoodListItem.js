import React, { useState } from 'react';
import './FoodListItem.css';

const FoodListItem = ({ food, onEdit, onDelete }) => {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const toggleSummaryVisibility = () => {
    setIsSummaryVisible(!isSummaryVisible);
  };

  return (
    <div className="food-list-item">
      <div className="food-details" onClick={toggleSummaryVisibility}>
        <h3 className="food-name">{food.food_name}</h3>
        {isSummaryVisible && (
          <div className="food-summary">
            <p>Calories: {food.calories.toFixed(2)}</p>
            <p>Protein: {food.protein_g.toFixed(2)}g</p>
            <p>Fat: {food.total_fat_g.toFixed(2)}g</p>
            <p>Carbs: {food.total_carbohydrate_g.toFixed(2)}g</p>
            {/* Additional nutritional details can be added here */}
          </div>
        )}
      </div>
      <div className="food-actions">
        <button onClick={() => onEdit(food.id)} className="edit-button">Edit</button>
        <button onClick={() => onDelete(food.id)} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default FoodListItem;
