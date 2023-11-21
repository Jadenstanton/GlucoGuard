import React, { useContext } from 'react';
import { ActivityContext } from '../../context/ActivityContext';
import ActivityListContainer from './ActivityList/ActivityListContainer';
import ActivityChartContainer from './ActivityChart/ActivityChartContainer';
// import ActivityChartCo;
import './ActivityPage.css'

const ActivityPage = () => {
    const { activities, handleEdit, handleDelete } = useContext(ActivityContext);

    return (
        <div className='activity-overview'>
            <ActivityChartContainer activities={activities} />
            <ActivityListContainer activities={activities} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ActivityPage;