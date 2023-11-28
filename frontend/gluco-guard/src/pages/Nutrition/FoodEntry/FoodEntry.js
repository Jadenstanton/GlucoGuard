import React, { useState } from 'react';
import './FoodEntry.css';

const FoodEntry = ({ onFoodSubmit, onRecipeSubmit }) => {
  const [foodInput, setFoodInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (foodInput.trim()) {
      onFoodSubmit(foodInput);
      setFoodInput('');
    }
  };

  const handleRecipeSubmit = (event) => {
    event.preventDefault();
    if (foodInput.trim()) {
      onRecipeSubmit(foodInput);
      setFoodInput('');
    }
  };

  return (
    <div className="food-entry-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="food-input"
          placeholder="Enter a food item or recipe"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
        />
        <div className='buttons-container'>
          <button type="submit" className="submit-button">Add Food</button>
          <button type="button" className="submit-button submit-recipe-button" onClick={handleRecipeSubmit}>
            Add Recipe
          </button>
        </div>

      </form>
    </div>
  );
};

export default FoodEntry;
