import React from 'react';
import ActivityList from './ActivityList';
import './ActivityListContainer.css';

const ActivityListContainer = ({ activities, onEdit, onDelete }) => {
    return (
        <div className="activity-list-container">
            <ActivityList activities={activities} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
};

export default ActivityListContainer;
