import React from 'react';
import './ActivityGraphContainer.css';
import ActivityGraph from './ActivityGraph';

const ActivityGraphContainer = ({ combinedActivity }) => {
  return (
    <div className="activity-graph-container">
      <ActivityGraph combinedActivity={combinedActivity} />
    </div>
  );
};

export default ActivityGraphContainer;
