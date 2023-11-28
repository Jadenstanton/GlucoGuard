import React from 'react';
import NutritionChart from './NutritionChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import './NutritionChartContainer.css';

const NutritionChartContainer = ({ foodItems }) => {
  console.log('Chart Data Prop in Container:', foodItems);
  if (!foodItems) {
    return <FontAwesomeIcon icon={faArrowsSpin} spin />;
  }
  return (
    <div className="nutrition-chart-container">
      <NutritionChart data={foodItems.data} />
    </div>
  );
};

export default NutritionChartContainer;
