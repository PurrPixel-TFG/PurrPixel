import React from "react";

const Perfil: React.FC = () => {
  //Uniremos esta parte en la BBDD
  const user = {
    name: "Nombre",
    username: "Nombre de usuario",
    email: "usuario@example.com",
    bio: "Información que quiera añadir el usuario",
    avatarUrl: "Foto",
  };

  const handleEdit = () => {
    alert("Editar perfil");
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
        <div className="perfil-info">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
        </div>
      </div>
      <p className="perfil-bio">{user.bio}</p>
      <p className="perfil-email">📧 {user.email}</p>
      <button className="edit-button" onClick={handleEdit}>
        Editar perfil
      </button>
    </div>
  );
  
};

export default Perfil;
