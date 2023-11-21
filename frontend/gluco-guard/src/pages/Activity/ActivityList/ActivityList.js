import React from 'react';
import ActivityListItem from '../ActivityListItem/ActivityListItem';
import './ActivityList.css';

const ActivityList = ({ activities, onDelete, onEdit }) => {
    // console.log('Activities in ActivityList:', activities); 
    return (
        <div className="activity-list">
            {activities && activities.map((activity, index) => (
                <ActivityListItem
                    key={activity.id}
                    activity={activity}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ActivityList;
