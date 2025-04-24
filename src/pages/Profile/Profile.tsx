import React from "react";
import './Profile.scss';

const Profile: React.FC = () => {
  //Uniremos esta parte en la BBDD. okis wapa <3
  const user = {
    name: "Name",
    username: "Username",
    email: "user@example.com",
    bio: "Information that the user wants to add",
    avatarUrl: "Picture",
  };

  const handleEdit = () => {
    alert("Edit profile");
  };

  return (
    <>

      <div className="profile-container">
        <div className="profile-header">
          <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>@{user.username}</p>
          </div>
        </div>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-email">📧 {user.email}</p>
        <button className="edit-button" onClick={handleEdit}>
          Edit profile
        </button>
      </div>
    </>
  );  

};

export default Profile;
