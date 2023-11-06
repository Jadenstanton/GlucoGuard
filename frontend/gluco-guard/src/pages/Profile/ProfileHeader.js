import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ username, profileImage }) => {
  return (
    <div className="profile-header">
      <img src={profileImage} alt={`${username}'s profile`} className="profile-image"/>
      <h1 className="username">{username}</h1>
      <h1 className="username">John Doe</h1>
    </div>
  );
};

export default ProfileHeader;
