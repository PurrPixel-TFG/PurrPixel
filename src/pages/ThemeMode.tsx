import React, { useEffect } from 'react';

interface ThemeModeProps {
  theme: string;
  setTheme: (val: string) => void;
}

const ThemeMode: React.FC<ThemeModeProps> = ({ theme, setTheme }) => {
  useEffect(() => {
    localStorage.setItem('themeMode', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    localStorage.setItem('themeModeManual', 'true');
  };
  

  return (
    <div className="theme-mode-selector">
      <label>Modo de fondo:</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="dia">🌞 Día</option>
        <option value="tarde">🌇 Tarde</option>
        <option value="noche">🌙 Noche</option>
      </select>
    </div>
  );
};

export default ThemeMode;
