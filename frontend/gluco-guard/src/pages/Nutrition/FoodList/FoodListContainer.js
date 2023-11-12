import React from 'react';
import FoodList from './FoodList';
import './FoodListContainer.css';

const FoodListContainer = ({ foods, onEdit, onDelete }) => {
  return (
    <div className="food-list-container">
      <FoodList foods={foods} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default FoodListContainer;
