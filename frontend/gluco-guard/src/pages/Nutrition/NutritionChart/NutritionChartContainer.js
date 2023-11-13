import React from 'react';
import NutritionChart from './NutritionChart';
import './NutritionChartContainer.css';

const NutritionChartContainer = ({ foodItems }) => {
  console.log('Chart Data Prop in Container:', foodItems);
  if (!foodItems) {
    return <div>Loading chart data...</div>;
  }
  return (
    <div className="chart-container">
      <NutritionChart data={foodItems.data} />
      {/* You can add more components or content here if needed */}
    </div>
  );
};

export default NutritionChartContainer;
