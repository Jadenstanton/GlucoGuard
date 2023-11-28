import React from "react";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import "./NutritionChart.css";

const NutritionChart = ({ data, showMacroChart }) => {
  if (!Array.isArray(data)) {
    return <FontAwesomeIcon icon={faArrowsSpin} spin />;
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
        backgroundColor: ["#212738", "#57C4E5", "#F97068"],
        hoverBackgroundColor: ["#212738", "#57C4E5", "#F97068"],
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
        data: [summary.calories, maxCalories - summary.calories],
        backgroundColor: ["#D1D646", "transparent"],
        borderColor: ["#D1D646", "transparent"],
        hoverBackgroundColor: ["#D1D646"],
        borderWidth: 1,
      },
    ],
  };

  const calorieChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    cutoutPercentage: 80,
    elements: { arc: { borderWidth: 1 } },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          if (tooltipItem.index === 0) {
            return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index]} kcal`;
          }
          return null;
        },
      },
    },
  };

  return (
    <div className="charts-flex-container">
      {showMacroChart && (
        <div className="nutrition-chart">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      )}
      <div className="nutrition-chart">
        <Doughnut data={calorieChartData} options={calorieChartOptions} />
      </div>
    </div>
  );
};

NutritionChart.defaultProps = {
  showMacroChart: true,
};

export default NutritionChart;
