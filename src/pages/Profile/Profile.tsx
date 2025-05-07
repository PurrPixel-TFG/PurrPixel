import React, { useEffect } from "react";
import './Profile.scss';

// Profile.tsx

// Text header
import textContent from '../../../assets_dressUp/text-content.png';

// Moving clouds
import cloud1 from '../../assets/assets_dressUp/clouds_dressUp/cloud-1.png';
import cloud2 from '../../assets/assets_dressUp/clouds_dressUp/cloud-2.png';
import cloud3 from '../../assets/assets_dressUp/clouds_dressUp/cloud-3.png';

// Menu icons
import checkIcon from '../../../assets/assets_dressUp/menu_dressUp/menu-check-icon.png';
import hatIcon from '../../../assets/assets_dressUp/menu_dressUp/menu-hat-icon.png';
import pantsIcon from '../../../assets/assets_dressUp/menu_dressUp/menu-pants-icon.png';
import shirtIcon from '../../../assets/assets_dressUp/menu_dressUp/menu-shirt-icon.png';

// Elements
import head from '../../../assets/assets_dressUp/dress_dressUp/head.png';
import blueShirt from '../../assets/assets_dressUp/dress-up-elements/blue-shirt.png';
import redShirt from '../../assets/assets_dressUp/dress-up-elements/red-shirt.png';
import sailorShirt from '../../assets/assets_dressUp/dress_dressUp/shirt-sailor.png';
import blueSkirt from '../../assets/assets_dressUp/dress-up-elements/skirt.png';
import yellowPants from '../../assets/assets_dressUp/dress-up-elements/yellow-pants.png';
import bluePants from '../../assets/assets_dressUp/dress-up-elements/blue-pants.png';
import frogHat from '../../assets/assets_dressUp/dress-up-elements/frog-hat.png';
import strawHat from '../../assets/assets_dressUp/dress-up-elements/straw-hat.png';
import blueBow from '../../assets/assets_dressUp/dress-up-elements/bow.png';


// ROPITA
import optBlueBow from '../../assets/assets_dressUp/option-icons/blue-bow-icon.png';

import optBlueShirt from '../../assets/assets_dressUp/option-icons/blue-shirt-icon.png';
import optBlueSkirt from '../../assets/assets_dressUp/option-icons/blue-skirt-icon.png';
import optRedShirt from '../../assets/assets_dressUp/option-icons/red-shirt-icon.png';
import optSailorShirt from '../../assets/assets_dressUp/option-icons/sailor-shirt-icon.png';

import optBluePants from '../../assets/assets_dressUp/option-icons/blue-pants-icon.png';
import optYellowPants from '../../assets/assets_dressUp/option-icons/yellow-pants-icon.png';

import optStrawHat from '../../assets/assets_dressUp/option-icons/straw-hat-icon.png';
import optFrogHat from '../../assets/assets_dressUp/option-icons/frog-hat-icon.png';


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
              <button className="arrow-left">←</button>

              <div className="character-area">
                <img src="background.png" className="preview-bg" />
                <img src="character.png" className="preview-character" />
              </div>

              <button className="arrow-right">→</button>
            </div>

            <div className="category-tabs">
              <button className="tab shirt"></button>
              <button className="tab pants active"></button>
              <button className="tab hat"></button>
              <button className="tab confirm"></button>
            </div>
          </div>


          <div className="item-options">
            <img src="item1.png" />
            <img src="item2.png" />
            <img src="item3.png" />
          </div>
        </div>

      </div>

    </>
  );

};

export default Profile;