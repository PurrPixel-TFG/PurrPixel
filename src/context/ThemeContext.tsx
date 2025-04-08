import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = 'dia' | 'tarde' | 'noche';


interface ThemeContextProps {
  theme: Theme;
  setTheme: (val: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dia',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('themeMode') as Theme | null;
    return stored || 'dia';
  });

  const setTheme = (val: Theme) => {
    setThemeState(val);
    document.body.setAttribute('data-theme', val);
    localStorage.setItem('themeMode', val);
    window.dispatchEvent(new Event("theme-changed")); // opcional si otros escuchan
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
