import React from 'react';
import AccountSettings from './AccountSettings/AccountSettings';
import DietPreferences from './DietPreferences/DietPreferences';
import UserProfile from './UserProfile/UserProfile';
import HealthGoals from './HealthGoals/HealthGoals';
// Import other settings components as needed
// import PrivacySettings from './PrivacySettings';
// import NotificationSettings from './NotificationSettings';
import './SettingsPage.css'; 

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-container">
        <AccountSettings />
        <DietPreferences />
        <UserProfile />
        <HealthGoals />
        {/* Add other settings components here */}
        {/* <PrivacySettings /> */}
        {/* <NotificationSettings /> */}
      </div>
    </div>
  );
};

export default SettingsPage;
