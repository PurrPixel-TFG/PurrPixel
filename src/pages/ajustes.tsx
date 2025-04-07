import React from "react";
import ThemeMode from "./ThemeMode";

interface AjustesProps {
  theme: string;
  setTheme: (val: string) => void;
}

const Ajustes: React.FC<AjustesProps> = ({ theme, setTheme }) => {
  return (
    <main>
      <div className="container_ajustes">
        <ThemeMode theme={theme} setTheme={setTheme} />
        <div className="ticket">Enviar ticket</div>
      </div>
    </main>
  );
};

export default Ajustes;
