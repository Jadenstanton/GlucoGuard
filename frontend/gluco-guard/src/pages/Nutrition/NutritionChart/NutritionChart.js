import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./NutritionChart.css";
import { sum } from "lodash";

const NutritionChart = ({ data, showMacroChart }) => {
  // console.log("Chart data:", data);
  if (!data || !Array.isArray(data)) {
    console.error("data is undefined or not an array:", data);
    return <div>Loading...</div>;
  }

  const summary = data.reduce(
    (acc, food) => {
      acc.calories += food.calories;
      acc.protein += food.protein_g;
      acc.fat += food.total_fat_g;
      acc.carbs += food.total_carbohydrate_g;
      return acc;
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );

  const chartData = {
    labels: ["Protein", "Fat", "Carbs"],
    datasets: [
      {
        data: [summary.protein, summary.fat, summary.carbs],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };
  const maxCalories = 3000;

  const calorieChartData = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [summary.calories, maxCalories - summary.calories], // Consumed calories and remaining to fill the donut
        backgroundColor: [
          "#FFCE56", // Color for consumed calories
          "transparent", // Make the remaining part transparent
        ],
        borderColor: [
          "#FFCE56", // Border color should match the consumed segment
          "transparent", // Transparent border for the remaining segment
        ],
        hoverBackgroundColor: [
          "#FFCE56", // Hover color for consumed calories
        ],
        borderWidth: 1, // Set border width to show the chart properly
      },
    ],
  };

  const calorieChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    cutoutPercentage: 80, // Adjust the cutout percentage to make the donut thicker or thinner
    elements: {
      arc: {
        borderWidth: 1, // Hide the border of the transparent arc
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          // Only show tooltip for the consumed calories segment
          if (tooltipItem.index === 0) {
            return (
              data.labels[tooltipItem.index] +
              ": " +
              data.datasets[0].data[tooltipItem.index] +
              " kcal"
            );
          }
          return null; // Hide tooltip for the transparent segment
        },
      },
    },
  };

  return (
    <div className="charts-flex-container">
      {showMacroChart && (
        <div className="chart">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      )}
      <div className="chart">
        <Doughnut data={calorieChartData} options={calorieChartOptions} />
      </div>
    </div>
  );
};

NutritionChart.defaultProps = {
  showMacroChart: true
};

export default NutritionChart;
