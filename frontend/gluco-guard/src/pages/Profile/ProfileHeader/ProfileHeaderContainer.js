import React from 'react';
import ProfileHeader from './ProfileHeader';
import './ProfileHeaderContainer.css';

const ProfileHeaderContainer = ({ username, profileImage }) => {
  return (
    <div className="user-profile">
      <ProfileHeader username={username} profileImage={profileImage} />
      {/* Additional profile subcomponents can be added here if necessary */}
    </div>
  );
};

export default ProfileHeaderContainer;
