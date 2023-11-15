import React from 'react';
import DailyLogFormContainer from './DailyLogForm/DailyLogFormContainer';
import './LoggingPage.css'

const LoggingPage = () => {
    return (
        <div className="log-page">
            <DailyLogFormContainer />
        </div>
    );
};

export default LoggingPage;
