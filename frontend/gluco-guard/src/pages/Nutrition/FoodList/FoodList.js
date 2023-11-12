import React from 'react';
import FoodListItem from '../FoodListItem/FoodListItem';
import './FoodList.css';

const FoodList = ({ foods, onEdit, onDelete }) => {
  return (
    <div className="food-list">
      {foods.map((food) => (
        <FoodListItem 
          key={food.id} 
          food={food} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default FoodList;
