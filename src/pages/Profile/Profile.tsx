import React from "react";
import './Profile.scss';
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  //Uniremos esta parte en la BBDD
  const user = {
    name: "Nombre",
    username: "Nombre de usuario",
    email: "usuario@example.com",
    bio: "Información que quiera añadir el usuario",
    avatarUrl: "Foto",
  };

  const handleEdit = () => {
    alert("Edit profile");
  };

  return (
    <>
      <div className="main-page-buttons-fixed">
        <Link to="/settings" className="main-page-button">Settings</Link>
        <Link to="/store" className="main-page-button">Store</Link>
        <Link to="/games" className="main-page-button">Games</Link>
      </div>
  
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
