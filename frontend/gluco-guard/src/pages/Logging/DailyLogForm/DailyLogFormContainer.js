import React from 'react';
import DailyLogForm from './DailyLogForm';
import './DailyLogFormContainer.css'

const DailyLogFormContainer = () => {
    return (
        <div className="log-container">
            {/* <h1>Daily Log</h1> */}
            <DailyLogForm />
        </div>
    );
};

export default DailyLogFormContainer;
