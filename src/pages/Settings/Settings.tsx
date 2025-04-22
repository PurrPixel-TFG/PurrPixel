import React from "react";
import ThemeMode from "../ThemeMode/ThemeMode";
import { Link } from "react-router-dom";
import './Settings.scss';

const Settings: React.FC = () => {
  return (
    <main>
      <div className="main-page-buttons-fixed">
        <Link to="/profile" className="main-page-button">Profile</Link>
        <Link to="/store" className="main-page-button">Store</Link>
        <Link to="/games" className="main-page-button">Games</Link>
      </div>

      <div className="container_settings">
        <ThemeMode /> {/* Ya no necesita props */}
        <div className="send_ticket">Send ticket</div>
      </div>
    </main>
  );
};

export default Settings;
