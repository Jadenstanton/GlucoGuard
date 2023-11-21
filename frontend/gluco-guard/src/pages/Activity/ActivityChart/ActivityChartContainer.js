import React from 'react';
import ActivityChart from './ActivityChart';
import './ActivityChartContainer.css';

const ActivityChartContainer = ({ activities }) => {
    // console.log('Activity Data Prop in Container:', activities);
    if (!activities) {
        return <div>Loading chart data...</div>;
    }
    return (
        <div className="chart-container">
            <ActivityChart activities={activities} />
        </div>
    );
};

export default ActivityChartContainer;
