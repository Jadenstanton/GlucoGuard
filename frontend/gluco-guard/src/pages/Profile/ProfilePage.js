import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
// import { ActivityContext } from '../../context/ActivityContext';
import { useCombinedActivityContext } from '../../context/CombinedActivityContext';
import { useActivityContext } from '../../context/ActivityContext';
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
    const location = useLocation()
    const isNewUser = location.state?.isNewUser || false;
    // console.log("Combined Activity Data in ProfilePage:", combinedActivity);
    return (
        <div className="profile-page profile-background">
            <ProfileHeaderContainer />

            <div className='main-content'>
                {/* <div className="profile-background"></div> */}
                <HealthMetricsContainer activityEvaluation={activityEvaluation} />
                <ActivityGraphContainer combinedActivity={combinedActivity} />
                <GoalsContainer />
                <AccountSettingsContainer />
                <BaseMetricsModalContainer isNewUser={isNewUser} />
            </div>


        </div>
    );
}


export default ProfilePage;
