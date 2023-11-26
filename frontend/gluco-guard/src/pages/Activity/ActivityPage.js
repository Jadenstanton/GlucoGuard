import React, { useContext } from 'react';
import { ActivityContext } from '../../context/ActivityContext';
import ActivityListContainer from './ActivityList/ActivityListContainer';
import ActivityChartContainer from './ActivityChart/ActivityChartContainer';
import DailyLogFormContainer from './DailyLogForm/DailyLogFormContainer';
import './ActivityPage.css'

const ActivityPage = () => {
    const { activities, handleEdit, handleDelete } = useContext(ActivityContext);

    return (
        <div className='activity-overview'>
            <DailyLogFormContainer />
            <ActivityChartContainer activities={activities} />
            <ActivityListContainer activities={activities} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ActivityPage;