import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProfilePage.css';
import ProfileHeader from './ProfileHeader';



const ProfilePage = () => {
    return (
        <div className="profile-page">
            <div className="profile-background"></div>
            
            <ProfileHeader />
        </div>
    );
}


export default ProfilePage;
