import React, { useEffect } from "react";
import './Profile.scss';

// Imágenes de contenido
import textContent from '../../../assets_dressUp/text-content.png';

// Fondos y nubes
import bgYellow from '../../assets/assets_dressUp/background/background-yellow.png';
import cloud1 from '../../../assets_dressUp/background/cloud-1.png';
import cloud2 from '../../../assets_dressUp/background/cloud-2.png';
import cloud3 from '../../../assets_dressUp/background/cloud-3.png';

// Elementos de vestuario
import head from '../../assets/assets_dressUp/dress-up-elements/head.png';
import blueShirt from '../../assets/assets_dressUp/dress-up-elements/blue-shirt.png';
import redShirt from '../../assets/assets_dressUp/dress-up-elements/red-shirt.png';
import sailorShirt from '../../assets/assets_dressUp/dress-up-elements/sailor-shirt.png';
import skirtImg from '../../assets/assets_dressUp/dress-up-elements/skirt.png';
import yellowPants from '../../assets/assets_dressUp/dress-up-elements/yellow-pants.png';
import bluePants from '../../assets/assets_dressUp/dress-up-elements/blue-pants.png';
import frogHat from '../../assets/assets_dressUp/dress-up-elements/frog-hat.png';
import strawHat from '../../assets/assets_dressUp/dress-up-elements/straw-hat.png';
import bow from '../../assets/assets_dressUp/dress-up-elements/bow.png';

// Iconos de etiquetas
import checkIcon from '../../../assets_dressUp/label-icons/check-icon.png';
import hatIcon from '../../../assets_dressUp/label-icons/hat-icon.png';
import pantsIcon from '../../../assets_dressUp/label-icons/pants-icon.png';
import shirtIcon from '../../../assets_dressUp/label-icons/shirt-icon.png';

// ROPITA
import optBlueBow from '../../assets/assets_dressUp/option-icons/blue-bow-icon.png';
import optBlueShirt from '../../assets/assets_dressUp/option-icons/blue-shirt-icon.png';
import optBlueSkirt from '../../assets/assets_dressUp/option-icons/blue-skirt-icon.png';
import optBluePants from '../../assets/assets_dressUp/option-icons/blue-pants-icon.png';
import optRedShirt from '../../assets/assets_dressUp/option-icons/red-shirt-icon.png';
import optSailorShirt from '../../assets/assets_dressUp/option-icons/sailor-shirt-icon.png';
import optStrawHat from '../../assets/assets_dressUp/option-icons/straw-hat-icon.png';
import optFrogHat from '../../assets/assets_dressUp/option-icons/frog-hat-icon.png';
import optYellowPants from '../../assets/assets_dressUp/option-icons/yellow-pants-icon.png';

const Profile: React.FC = () => {
  const user = {
    name: "Name",
    username: "Username",
    email: "user@example.com",
    bio: "Information that the user wants to add",
    avatarUrl: "Picture",
  };

  const handleEdit = () => alert("Edit profile");

  // Tipos para evitar error TS7053. D': ioro muy fuertemente
  type ShirtKey = "shirt-1" | "shirt-2" | "shirt-3";
  type SkirtKey = "skirt-1" | "skirt-2" | "skirt-3";
  type HatKey = "hat-1" | "hat-2" | "hat-3";

  const shirtOptions: Record<ShirtKey, string> = {
    "shirt-1": blueShirt,
    "shirt-2": redShirt,
    "shirt-3": sailorShirt,
  };
  const skirtOptions: Record<SkirtKey, string> = {
    "skirt-1": skirtImg,
    "skirt-2": yellowPants,
    "skirt-3": bluePants,
  };
  const hatOptions: Record<HatKey, string> = {
    "hat-1": strawHat,
    "hat-2": frogHat,
    "hat-3": bow,
  };

  const backgroundOptions = [bgYellow];

  useEffect(() => {
    const shirtEl = document.getElementById('shirt') as HTMLImageElement | null;
    const skirtEl = document.getElementById('skirt') as HTMLImageElement | null;
    const hatEl = document.getElementById('hat') as HTMLImageElement | null;
    const container = document.querySelector('.pochacco-container') as HTMLElement | null;
    if (!shirtEl || !skirtEl || !hatEl || !container) return;

    let currentBg = 0;
    const updateBg = (i: number) => {
      container.style.backgroundImage = `url(${backgroundOptions[i]})`;
      document.body.style.backgroundImage = `url(${backgroundOptions[i]})`;
    };
    const updateShirt = (key: ShirtKey) => { shirtEl.src = shirtOptions[key]; };
    const updateSkirt = (key: SkirtKey) => { skirtEl.src = skirtOptions[key]; };
    const updateHat = (key: HatKey) => { hatEl.src = hatOptions[key]; };

    (Object.keys(shirtOptions) as ShirtKey[]).forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => updateShirt(id));
    });
    (Object.keys(skirtOptions) as SkirtKey[]).forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => updateSkirt(id));
    });
    (Object.keys(hatOptions) as HatKey[]).forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => updateHat(id));
    });

    document.getElementById('left-background-button')?.addEventListener('click', () => {
      currentBg = (currentBg - 1 + backgroundOptions.length) % backgroundOptions.length;
      updateBg(currentBg);
    });
    document.getElementById('right-background-button')?.addEventListener('click', () => {
      currentBg = (currentBg + 1) % backgroundOptions.length;
      updateBg(currentBg);
    });

    updateBg(currentBg);
  }, []);

  return (

    //PARTE DEL PERFIL ANTERIOR
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.avatarUrl} alt="Avatar" />
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>@{user.username}</p>
          </div>
        </div>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-email">📧 {user.email}</p>
        <button className="edit-button" onClick={handleEdit}>Edit profile</button>
      </div>

      <div className="dressUp_container">
        <div className="dress-up-panel">
          <div className="pochacco-container">
            <img id="shirt" src={head} alt="shirt" />
            <img id="skirt" src={skirtImg} alt="skirt" />
            <img id="hat" src={frogHat} alt="hat" />
          </div>
          <div className="dress-up-controls">
            <button id="shirt-1" className="option-button"><img src={optBlueShirt} alt="Blue Shirt"/></button>
            <button id="shirt-2" className="option-button"><img src={optRedShirt} alt="Red Shirt"/></button>
            <button id="shirt-3" className="option-button"><img src={optSailorShirt} alt="Sailor Shirt"/></button>
            <button id="skirt-1" className="option-button"><img src={optBlueSkirt} alt="Skirt"/></button>
            <button id="skirt-2" className="option-button"><img src={optYellowPants} alt="Yellow Pants"/></button>
            <button id="skirt-3" className="option-button"><img src={optBluePants} alt="Blue Pants"/></button>
            <button id="hat-1" className="option-button"><img src={optStrawHat} alt="Straw Hat"/></button>
            <button id="hat-2" className="option-button"><img src={optFrogHat} alt="Frog Hat"/></button>
            <button id="hat-3" className="option-button"><img src={optBlueBow} alt="Bow"/></button>
            <button id="left-background-button">←</button>
            <button id="right-background-button">→</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
