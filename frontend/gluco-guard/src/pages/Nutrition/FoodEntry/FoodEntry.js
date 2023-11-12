import React, { useState } from 'react';
import './FoodEntry.css'; 

const FoodEntry = ({ onFoodSubmit }) => {
  const [foodInput, setFoodInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (foodInput.trim()) {
      onFoodSubmit(foodInput);
      setFoodInput('');
    }
  };

  return (
    <div className="food-entry-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="food-input"
          placeholder="Enter a food item"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
        />
        <button type="submit" className="submit-button">Add Food</button>
      </form>
    </div>
  );
};

export default FoodEntry;
