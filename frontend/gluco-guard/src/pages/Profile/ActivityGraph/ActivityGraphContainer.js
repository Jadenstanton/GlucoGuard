import React from 'react';
import './ActivityGraphContainer.css';
import ActivityGraph from './ActivityGraph';

const ActivityGraphContainer = ({ combinedActivity }) => {
  // console.log("Monthly Counts in ActivityGraph:", combinedActivity);
  return (
    <div className="activity-graph-container">
      <ActivityGraph combinedActivity={combinedActivity} />
    </div>
  );
};

export default ActivityGraphContainer;
