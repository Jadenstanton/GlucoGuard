import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useCombinedActivityContext } from '../../context/CombinedActivityContext';
import { useActivityContext } from '../../context/ActivityContext';
import { useBaseMetrics } from '../../context/BaseMetricsContext';
import { AuthContext } from '../../context/AuthContext';
import './ProfilePage.css';

import ProfileHeaderContainer from './ProfileHeader/ProfileHeaderContainer';
import HealthMetricsContainer from './HealthMetrics/HealthMetricsContainer';
import AccountSettingsContainer from './AccountSettings/AccountSettingsContainer';
import GoalsContainer from './Goals/GoalsContainer';
import ActivityGraphContainer from './ActivityGraph/ActivityGraphContainer';
import BaseMetricsModalContainer from './BaseMetricsModal/BaseMetricsModalContainer';

const ProfilePage = () => {
    const { combinedActivity } = useCombinedActivityContext();
    const { activityEvaluation } = useActivityContext();
    const { baseMetrics, handleBaseMetricsChange } = useBaseMetrics();
    const { username } = useContext(AuthContext);

    const location = useLocation();
    const isNewUser = location.state?.isNewUser || false;
    const displayedUsername = location.state?.username || username;

    return (
        <div className="profile-page profile-background">
            <ProfileHeaderContainer username={displayedUsername} />
            <div className='main-content'>
                <HealthMetricsContainer activityEvaluation={activityEvaluation} />
                <ActivityGraphContainer combinedActivity={combinedActivity} />
                <GoalsContainer />
                <AccountSettingsContainer baseMetrics={baseMetrics} onBaseMetricsChange={handleBaseMetricsChange} />
                <BaseMetricsModalContainer isNewUser={isNewUser} />
            </div>
        </div>
    );
}

export default ProfilePage;
