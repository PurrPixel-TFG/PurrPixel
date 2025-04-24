import React from "react";
import ThemeMode from "../ThemeMode/ThemeMode";
import './Settings.scss';

const Settings: React.FC = () => {
  return (
    <main>
      <div className="container_settings">
        <ThemeMode /> {/* Ya no necesita props */}
        <div className="send_ticket">Send ticket</div>
      </div>
    </main>
  );
};

export default Settings;
