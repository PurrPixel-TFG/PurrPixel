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
    const selected = e.target.value;
    if (selected === 'auto') {
      localStorage.removeItem('themeModeManual');
      const autoTheme = getAutoTheme();
      setTheme(autoTheme);
      localStorage.setItem('themeMode', autoTheme);
    } else {
      setTheme(selected);
      localStorage.setItem('themeMode', selected);
      localStorage.setItem('themeModeManual', 'true');
    }
  };

  const getAutoTheme = (): string => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'dia';
    if (hour >= 12 && hour < 20) return 'tarde';
    return 'noche';
  };

  return (
    <div className="theme-mode-selector">
      <label>Modo de fondo:</label>
      <select value={localStorage.getItem('themeModeManual') === 'true' ? theme : 'auto'} onChange={handleChange}>
        <option value="auto">⏰ Automático</option>
        <option value="dia">🌞 Día</option>
        <option value="tarde">🌇 Tarde</option>
        <option value="noche">🌙 Noche</option>
      </select>
    </div>
  );
};

export default ThemeMode;
