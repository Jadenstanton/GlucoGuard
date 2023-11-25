import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ActivityGraph = ({ combinedActivity }) => {
  if (!combinedActivity) {
    return <div>Loading...</div>;
  }

  const labels = combinedActivity.map(item => item.date);
  const foodCounts = combinedActivity.map(item => item.foodCount);
  const activityCounts = combinedActivity.map(item => item.activityCount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Food Submissions',
        data: foodCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Activity Submissions',
        data: activityCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        stacked: true,
      },
      x: {
        stacked: true,
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="activity-graph" style={{ height: '300px', width: '90%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActivityGraph;