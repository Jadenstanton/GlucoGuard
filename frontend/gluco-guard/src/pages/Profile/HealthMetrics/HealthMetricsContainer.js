import React from 'react';
import './HealthMetricsContainer.css';
import HealthMetrics from './HealthMetrics';

const HealthMetricsContainer = ({ activityEvaluation }) => {
  return (
    <div className="health-metrics-container">
      <HealthMetrics activityEvaluation={activityEvaluation} />
    </div>
  );
};

export default HealthMetricsContainer;
