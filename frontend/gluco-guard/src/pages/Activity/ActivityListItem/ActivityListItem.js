import React, { useState } from 'react';
import './ActivityListItem.css';

const ActivityListItem = ({ activity, onEdit, onDelete }) => {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const toggleDetailsVisibility = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

    return (
        <div className="activity-list-item">
            <div className="activity-details" onClick={toggleDetailsVisibility}>
                <h3 className="activity-name">{activity.title}</h3>
                {isDetailsVisible && (
                    <div className="activity-summary">
                        <p>Duration: {activity.duration} minutes</p>
                        <p>Heart Rate: {activity.heart_rate} bpm</p>
                        <p>Breathing Rate: {activity.breathing_rate} bpm</p>
                    </div>
                )}
            </div>
            <div className="activity-actions">
                <button onClick={() => onEdit(activity.id)} className="edit-button">Edit</button>
                <button onClick={() => onDelete(activity.id)} className="delete-button">Delete</button>
            </div>
        </div>
    );
};

export default ActivityListItem;
