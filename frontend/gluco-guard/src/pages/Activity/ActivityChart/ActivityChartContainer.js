import React from 'react';
import ActivityChart from './ActivityChart';
import './ActivityChartContainer.css';

const ActivityChartContainer = ({ activities }) => {
    if (!activities) {
        return <div>Loading chart data...</div>;
    }
    return (
        <div className="activity-chart-container">
            <ActivityChart activities={activities} />
        </div>
    );
};

export default ActivityChartContainer;
