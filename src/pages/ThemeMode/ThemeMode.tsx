import React from 'react';
import './ThemeMode.scss';
import { useTheme } from "../../context/ThemeContext";
import type { Theme } from "../../context/ThemeContext";

const ThemeMode: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === 'auto') {
      localStorage.removeItem('themeModeManual');
      const autoTheme = getAutoTheme();
      setTheme(autoTheme); // ahora es de tipo Theme
    } else {
      localStorage.setItem('themeModeManual', 'true');
      setTheme(selected as Theme);
    }
  };

  const getAutoTheme = (): Theme => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 20) return 'evening';
    return 'night';
  };

  return (
    <div className="theme-mode-selector">
      <label>Theme mode:</label>
      <select
        value={localStorage.getItem('themeModeManual') === 'true' ? theme : 'auto'}
        onChange={handleChange}
      >
        <option value="auto">⏰ Local theme </option>
        <option value="morning">🌞 Morning theme </option>
        <option value="evening">🌇 Evening theme </option>
        <option value="night">🌙 Night theme </option>
      </select>
    </div>
  );
};

export default ThemeMode;
