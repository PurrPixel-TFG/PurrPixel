import React from "react"; 
import ThemeMode from "../ThemeMode/ThemeMode";
import './Settings.scss';

import building from "../../assets/building.png";

const Settings: React.FC = () => {
  return (
    <main>
      <div className="container_settings">
        <ThemeMode /> 
        <div className="send_ticket">
          Send ticket
          <br /> 
          (.. Coming soon ...)
          <br /> 
          <br />
          <img src={building} alt="Building" />
        </div>
      </div>
    </main>
  );
};

export default Settings;
