import React from "react";
import ColorblindToggle from "./ColorblindToggle";

const Ajustes: React.FC = () => {
  return (
    <main>
      <div className="container_ajustes">
        <ColorblindToggle />
        <ThemeMode />
        <div className="ticket">Enviar ticket</div>
        </div>
    </main>
  );
};

export default Ajustes;
