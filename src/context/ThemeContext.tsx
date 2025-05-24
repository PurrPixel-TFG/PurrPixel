import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/SupabaseClient";

// El tema del usuario se recupera y aplica al entrar.
// Al cambiarlo desde ThemeMode, se guarda en Supabase.
// Todo se mantiene sincronizado con localStorage, el DOM y Supabase.

export type Theme = 'morning' | 'evening' | 'night';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (val: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'morning',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('themeMode') as Theme | null;
    return stored || 'morning';
  });

  const setTheme = (val: Theme) => {
    setThemeState(val);
    document.body.setAttribute('data-theme', val);
    localStorage.setItem('themeMode', val);
    window.dispatchEvent(new Event("theme-changed"));
    updateThemeInSupabase(val); // ✅ guarda en Supabase también
  };

  const updateThemeInSupabase = async (newTheme: Theme) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({ theme: newTheme })
      .eq("id", user.id);
  };

  useEffect(() => {
    const fetchUserTheme = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("theme")
        .eq("id", user.id)
        .single();

      if (!error && data?.theme) {
        setThemeState(data.theme as Theme);
        document.body.setAttribute('data-theme', data.theme);
        localStorage.setItem('themeMode', data.theme);
      }
    };

    fetchUserTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
