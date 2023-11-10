import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ActivityGraph = () => {
  // Function to determine the color intensity based on the data value
  const getColor = (value) => {
    const alpha = (value / Math.max(...data.datasets[0].data)) * 0.8 + 0.2; // Scale between 0.2 and 1
    return `rgba(75, 192, 192, ${alpha})`;
  };

  // Mock data for the graph 
  const data = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Submissions',
        data: [12, 19, 3, 5, 2, 3, 30, 45, 23, 18, 3, 9],
        backgroundColor: (context) => {
          const value = context.raw; 
          return getColor(value); 
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
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
