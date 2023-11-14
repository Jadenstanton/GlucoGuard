import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProfilePage.css';
import ProfileHeaderContainer from './ProfileHeader/ProfileHeaderContainer';
import HealthMetricsContainer from './HealthMetrics/HealthMetricsContainer';
import AccountSettingsContainer from './AccountSettings/AccountSettingsContainer';
import GoalsContainer from './Goals/GoalsContainer';
import ActivityGraphContainer from './ActivityGraph/ActivityGraphContainer';
import BaseMetricsModalContainer from './BaseMetricsModal/BaseMetricsModalContainer';



const ProfilePage = () => {
    const location = useLocation()
    const isNewUser = location.state?.isNewUser || false;
    return (
        <div className="profile-page profile-background">
            <ProfileHeaderContainer />

            <div className='main-content'>
                {/* <div className="profile-background"></div> */}
                <HealthMetricsContainer />
                <ActivityGraphContainer />
                <GoalsContainer />
                <AccountSettingsContainer />
                <BaseMetricsModalContainer isNewUser={isNewUser} />
            </div>


            {/* <ProfileHeader /> */}
        </div>
    );
}


export default ProfilePage;
