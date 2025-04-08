import React from 'react';
import { useTheme } from '../context/ThemeContext';
import type { Theme } from '../context/ThemeContext'; // Error: Module '"../context/ThemeContext"' declares 'Theme' locally, but it is not exported.ts(2459)

const ThemeMode: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === 'auto') {
      localStorage.removeItem('themeModeManual');
      const autoTheme = getAutoTheme();
      setTheme(autoTheme); // ✅ ahora es de tipo Theme
    } else {
      localStorage.setItem('themeModeManual', 'true');
      setTheme(selected as Theme);
    }
  };

  const getAutoTheme = (): Theme => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'dia';
    if (hour >= 12 && hour < 20) return 'tarde';
    return 'noche';
  };

  return (
    <div className="theme-mode-selector">
      <label>Modo de fondo:</label>
      <select
        value={localStorage.getItem('themeModeManual') === 'true' ? theme : 'auto'}
        onChange={handleChange}
      >
        <option value="auto">⏰ Automático</option>
        <option value="dia">🌞 Día</option>
        <option value="tarde">🌇 Tarde</option>
        <option value="noche">🌙 Noche</option>
      </select>
    </div>
  );
};

export default ThemeMode;
