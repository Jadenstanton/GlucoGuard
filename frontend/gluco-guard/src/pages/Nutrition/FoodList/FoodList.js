import React from 'react';
import FoodListItem from '../FoodListItem/FoodListItem';
import './FoodList.css';

const FoodList = ({ foods, onEdit, onDelete }) => {
  const foodItems = foods.data;
  return (
    <div className="food-list">
      {foodItems && foodItems.map((food) => (
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
