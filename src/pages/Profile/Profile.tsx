import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import { supabase } from "../../supabase/SupabaseClient";
import './Profile.scss';



// Profile.tsx

import characterUs from '../../assets/assets_dressUp/characterUs.png';

// Moving clouds
import cloud1 from '../../assets/assets_dressUp/clouds_dressup/cloud-1.png';
import cloud2 from '../../assets/assets_dressUp/clouds_dressup/cloud-2.png';
import cloud3 from '../../assets/assets_dressUp/clouds_dressup/cloud-3.png';

// Elements
import shirtBlue from '../../assets/assets_dressup/dress_dressup/shirt-blue.png';
import shirtRed from '../../assets/assets_dressup/dress_dressup/shirt-red.png';
import shirtSailor from '../../assets/assets_dressup/dress_dressup/shirt-sailor.png';
import skirtBlue from '../../assets/assets_dressup/dress_dressup/skirt-blue.png';
import pantsYellow from '../../assets/assets_dressup/dress_dressup/pants-yellow.png';
import pantsBlue from '../../assets/assets_dressup/dress_dressup/pants-blue.png';
import hatFrog from '../../assets/assets_dressup/dress_dressup/hat-frog.png';
import hatStraw from '../../assets/assets_dressup/dress_dressup/hat-straw.png';
import hatPink from '../../assets/assets_dressup/dress_dressup/hat-Pink.png';

// Icon
import iconHatPink from '../../assets/assets_dressup/icon_dressup/icon-hat-Pink.png';
import iconShirtBlue from '../../assets/assets_dressup/icon_dressup/icon-shirt-blue.png';
import iconShirtRed from '../../assets/assets_dressup/icon_dressup/icon-shirt-red.png';
import iconShirtSailor from '../../assets/assets_dressup/icon_dressup/icon-shirt-sailor.png';
import iconSkirtBlue from '../../assets/assets_dressup/icon_dressup/icon-skirt-blue.png';
import iconPantsBlue from '../../assets/assets_dressup/icon_dressup/icon-pants-blue.png';
import iconPantsYellow from '../../assets/assets_dressup/icon_dressup/icon-pants-yellow.png';
import iconHatFrog from '../../assets/assets_dressup/icon_dressup/icon-hat-frog.png';
import iconHatStraw from '../../assets/assets_dressup/icon_dressup/icon-hat-straw.png';

// Camera and chest
import camera from '../../assets/assets_dressup/camera.png'
import chest from '../../assets/assets_dressup/chest.png'

const Profile: React.FC = () => {

  const navigate = useNavigate();

  // Componente camara
  const [avatarUrl, setAvatarUrl] = useState<string>("https://via.placeholder.com/100");
  const characterRef = useRef<HTMLDivElement | null>(null);

  // Container Profile info
  const [userData, setUserData] = useState({
    name: "Name",
    username: "Username", // Este dato será fijo
    email: "user@example.com", // Este dato será fijo
    bio: "Say something about you...",
  });
  const [showModal, setShowModal] = useState(false);

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Guardar información editada en Supabase
  const handleSave = async () => {
    setShowModal(false);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        name: userData.name,
        username: userData.username,
        bio: userData.bio,
        avatar_url: avatarUrl,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile:", error.message);
    } else {
      console.log("Perfil actualizado");
    }
  };


  const [activeShirt, setActiveShirt] = useState<string | null>(null);
  const [activePants, setActivePants] = useState<string | null>(null);
  const [activeHat, setActiveHat] = useState<string | null>(null);

  const toggleClothing = (type: 'shirt' | 'pants' | 'hat', value: string) => {
    if (type === 'shirt') {
      setActiveShirt(prev => prev === value ? null : value);
    } else if (type === 'pants') {
      setActivePants(prev => prev === value ? null : value);
    } else if (type === 'hat') {
      setActiveHat(prev => prev === value ? null : value);
    }
  };

  const goToStock = () => {
    navigate('/stock');
  };

  // Avatar en Supabase Storage
  const handleCapture = async () => {

    if (!characterRef.current) return;

    const canvas = await html2canvas(characterRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    });

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png")
    );
    if (!blob) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fileName = `avatar-${user.id}.png`;

    // Paso 1: crear URL firmada para el usuario autenticado
    const { data: signedUpload, error: signedError } = await supabase.storage
      .from("avatars")
      .createSignedUploadUrl(fileName);

    if (signedError) {
      console.error("Signed upload error:", signedError.message);
      return;
    }

    // Paso 2: subir con la URL firmada
    const uploadRes = await fetch(signedUpload.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": "image/png" },
      body: blob,
    });

    if (!uploadRes.ok) {
      console.error("Upload failed:", await uploadRes.text());
      return;
    }

    const publicUrl = supabase
      .storage
      .from("avatars")
      .getPublicUrl(fileName).data.publicUrl;

    setAvatarUrl(publicUrl);

    // Actualiza en la tabla 'profiles'
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating avatar URL:", updateError.message);
    }
  };


  return (
    <>
      {/* Profile container */}
      <div className="profile-background-layer" />
      <div className="profile-layout">
        <div className="profile-container">
          <div className="profile-header">
            <img className="profile-background" src={avatarUrl} alt={`${userData.name}'s avatar`} />
            <div className="profile-info">
              <h2>{userData.name}</h2>
              <p>@{userData.username}</p>
              <p className="profile-bio">{userData.bio}</p>
              <p className="profile-email">{userData.email}</p>
            </div>
          </div><button className="edit-button" onClick={handleEditProfile}>
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

              <div className="character-area" ref={characterRef}>
                <img src={characterUs} className="layer face" alt="Cat base" />
                <img src={hatStraw} className="layer hat" alt="Hat" />
                <img src={shirtRed} className="layer shirt" alt="Shirt" />
                <img src={pantsBlue} className="layer pants" alt="Pants" />


                {activeHat === 'hat-frog' && (
                  <img src={hatFrog} className="layer hat" alt="Hat" />
                )}
                {activeHat === 'hat-straw' && (
                  <img src={hatStraw} className="layer hat" alt="Hat" />
                )}
                {activeHat === 'hat-Pink' && (
                  <img src={hatPink} className="layer hat" alt="Hat" />
                )}

                {activeShirt === 'shirt-blue' && (
                  <img src={shirtBlue} className="layer shirt" alt="Shirt" />
                )}
                {activeShirt === 'shirt-red' && (
                  <img src={shirtRed} className="layer shirt" alt="Shirt" />
                )}
                {activeShirt === 'shirt-sailor' && (
                  <img src={shirtSailor} className="layer shirt" alt="Shirt" />
                )}
                {activePants === 'pants-blue' && (
                  <img src={pantsBlue} className="layer pants" alt="Pants" />
                )}
                {activePants === 'pants-yellow' && (
                  <img src={pantsYellow} className="layer pants" alt="Pants" />
                )}
                {activePants === 'skirt-blue' && (
                  <img src={skirtBlue} className="layer pants" alt="Pants" />
                )}
              </div>
            </div>
          </div>


          <div className="dress-dressUp">
            <img
              src={iconHatPink}
              alt="Pink Hat"
              onClick={() => toggleClothing('hat', 'hat-Pink')}
            />
            <img
              src={iconHatFrog}
              alt="Frog Hat"
              onClick={() => toggleClothing('hat', 'hat-frog')}
            />
            <img
              src={iconHatStraw}
              alt="Straw Hat"
              onClick={() => toggleClothing('hat', 'hat-straw')}
            />
          </div>


          <div className="dress-dressUp">
            <img
              src={iconShirtBlue}
              alt="Blue Shirt"
              onClick={() => toggleClothing('shirt', 'shirt-blue')}
            />
            <img
              src={iconShirtRed}
              alt="Red Shirt"
              onClick={() => toggleClothing('shirt', 'shirt-red')}
            />
            <img
              src={iconShirtSailor}
              alt="Sailor Shirt"
              onClick={() => toggleClothing('shirt', 'shirt-sailor')}
            />
          </div>


          <div className="dress-dressUp">
            <img
              src={iconPantsBlue}
              alt="Blue Pants"
              onClick={() => toggleClothing('pants', 'pants-blue')}
            />
            <img
              src={iconPantsYellow}
              alt="Yellow Pants"
              onClick={() => toggleClothing('pants', 'pants-yellow')}
            />
            <img
              src={iconSkirtBlue}
              alt="Blue Skirt"
              onClick={() => toggleClothing('pants', 'skirt-blue')}
            />
          </div>
        </div>
      </div>

      {/* Camera and chest */}
      <div className="profile-side-buttons">
        <div className="profile-button" onClick={handleCapture}>
          <img src={camera} alt="Camera" />
        </div>
        <div className="profile-button" onClick={goToStock}>
          <img src={chest} alt="Chest" />
        </div>

      </div>

      {/* Insertar datos nuevos en el perfil de usuario */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Your Profile</h3>
            <input
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
            <input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              placeholder="Bio"
            />
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </>

  );

};

export default Profile;