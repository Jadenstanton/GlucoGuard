import React, { useState } from 'react';
import './FoodListItem.css';

const FoodListItem = ({ food, onEdit, onDelete }) => {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const toggleSummaryVisibility = () => {
    setIsSummaryVisible(!isSummaryVisible);
  };
  
//   console.log('foods:', food)

  return (
    <div className="food-list-item">
      <div className="food-details" onClick={toggleSummaryVisibility}>
        <h3 className="food-name">{food.food_name}</h3>
        {isSummaryVisible && (
          <div className="food-summary">
            <p>Calories: {food.calories}</p>
            <p>Protein: {food.protein_g}g</p>
            <p>Fat: {food.total_fat_g}g</p>
            <p>Carbs: {food.total_carbohydrate_g}g</p>
            <p>Carbs: {food.total_carbohydrate_g}g</p>
            {/*TODO*/}
            {/* Add more nutritional details as needed */}
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
