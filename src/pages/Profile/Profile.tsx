import React, { useEffect } from "react";
import './Profile.scss';

// Profile.tsx

import catOrange from '../../assets/assets_dressUp/catOrange.png';
import arrowLeftDressUp from '../../assets/assets_dressUp/left-arrow-dressUp.png';
import arrowRightDressUp from '../../assets/assets_dressUp/right-arrow-dressUp.png';

// Moving clouds
import cloud1 from '../../assets/assets_dressUp/clouds_dressUp/cloud-1.png';
import cloud2 from '../../assets/assets_dressUp/clouds_dressUp/cloud-2.png';
import cloud3 from '../../assets/assets_dressUp/clouds_dressUp/cloud-3.png';

// Menu icons
import checkIcon from '../../assets/assets_dressUp/menu_dressUp/menu-check-icon.png';
import hatIcon from '../../assets/assets_dressUp/menu_dressUp/menu-hat-icon.png';
import pantsIcon from '../../assets/assets_dressUp/menu_dressUp/menu-pants-icon.png';
import shirtIcon from '../../assets/assets_dressUp/menu_dressUp/menu-shirt-icon.png';

// Elements
import head from '../../../assets/assets_dressUp/dress_dressUp/head.png';
import shirtBlue from '../../../assets/assets_dressUp/dress_dressUp/shirt-blue.png';
import shirtRed from '../../../assets/assets_dressUp/dress_dressUp/shirt-red.png';
import shirtSailor from '../../../assets/assets_dressUp/dress_dressUp/shirt-sailor.png';
import skirtBlue from '../../../assets/assets_dressUp/dress_dressUp/skirt-blue.png';
import pantsYellow from '../../../assets/assets_dressUp/dress_dressUp/pants-yellow.png';
import pantsBlue from '../../../assets/assets_dressUp/dress_dressUp/pants-blue.png';
import hatFrog from '../../../assets/assets_dressUp/dress_dressUp/hat-frog.png';
import hatStraw from '../../../assets/assets_dressUp/dress_dressUp/hat-straw.png';
import hatBlueBow from '../../../assets/assets_dressUp/dress_dressUp/hat-blueBow.png';

// Icon
import iconHatBlueBow from '../../assets/assets_dressUp/icon_dressUp/icon-hat-blueBow.png';
import iconShirtBlue from '../../assets/assets_dressUp/icon_dressUp/icon-shirt-blue.png';
import iconShirtRed from '../../assets/assets_dressUp/icon_dressUp/icon-shirt-red.png';
import iconShirtSailor from '../../assets/assets_dressUp/icon_dressUp/icon-shirt-sailor.png';
import iconSkirtBlue from '../../assets/assets_dressUp/icon_dressUp/icon-skirt-blue.png';
import iconPantsBlue from '../../assets/assets_dressUp/icon_dressUp/icon-pants-blue.png';
import iconPantsYellow from '../../assets/assets_dressUp/icon_dressUp/icon-pants-yellow.png';
import iconHatFrog from '../../assets/assets_dressUp/icon_dressUp/icon-hat-frog.png';
import iconHatStraw from '../../assets/assets_dressUp/icon_dressUp/icon-hat-straw.png';

const Profile: React.FC = () => {

  // Container Profile info
  const user = {
    name: "Name",
    username: "Username",
    email: "user@example.com",
    bio: "Information that the user wants to add",
    avatarUrl: "Picture",
  };

  const handleEdit = () => alert("Edit profile");

  return (
    <>
      {/* Profile container */}
      <div className="profile-layout">

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

        {/* Clouds */}
        <div className="clouds-wrapper">
          <div className="cloudsGroup">
            <img src={cloud1} alt="Cloud 1" className="cloud cloud-1" />
            <img src={cloud2} alt="Cloud 2" className="cloud cloud-2" />
            <img src={cloud3} alt="Cloud 3" className="cloud cloud-3" />
          </div>
        </div>


        {/* Dressup */}
        <div className="dressup-frame">
          <div className="dressup-header">What should i wear today?</div>

          <div className="dressup-preview">
            <div className="character-navigation">

              <button className="arrow-left">
                <img src={arrowLeftDressUp} alt="Left" />
              </button>

              <div className="character-area">
                <img src={catOrange} className="preview-character" alt="Cat Character" />
              </div>

              <button className="arrow-right">
                <img src={arrowRightDressUp} alt="Right" />
              </button>
              
            </div>


            <div className="menu-dressUp">
              <button className="tab shirt">
                <img src={shirtIcon} alt="Shirt" />
              </button>
              <button className="tab pants active">
                <img src={pantsIcon} alt="Pants" />
              </button>
              <button className="tab hat">
                <img src={hatIcon} alt="Hat" />
              </button>
              <button className="tab confirm">
                <img src={checkIcon} alt="Confirm" />
              </button>
            </div>
          </div>


          <div className="dress-dressUp">
            <img src={iconShirtBlue} alt="Blue Shirt" />
            <img src={iconShirtRed} alt="Red Shirt" />
            <img src={iconShirtSailor} alt="Sailor Shirt" />
          </div>

        </div>

      </div>

    </>
  );

};

export default Profile;