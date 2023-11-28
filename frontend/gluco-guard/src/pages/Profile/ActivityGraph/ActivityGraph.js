import React from 'react';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import 'chart.js/auto';

const ActivityGraph = ({ combinedActivity }) => {
  if (!combinedActivity) {
    return <FontAwesomeIcon icon={faArrowsSpin} spin />;
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
        backgroundColor: '#D1D646',
        borderColor: '#D1D646',
      },
      {
        label: 'Activity Submissions',
        data: activityCounts,
        backgroundColor: '#212738',
        borderColor: '#212738',
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
