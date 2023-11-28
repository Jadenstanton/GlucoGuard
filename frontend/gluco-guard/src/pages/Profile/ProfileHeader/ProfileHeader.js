import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ username }) => {
  const profileImage = localStorage.getItem('profilePicture') || '/assets/images/default-pfp.jpg';

  return (
    <div className="profile-header">
      <img src={profileImage} alt={`${username}'s profile`} className="profile-image" />
      <h1 className="username">{username || 'Guest'}</h1>
      {/* Additional elements can be added here if needed */}
    </div>
  );
};

export default ProfileHeader;
