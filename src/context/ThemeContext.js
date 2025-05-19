import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  card: '#f0f0f0',
  button: '#ff6600',
};

const darkTheme = {
  background: '#121212',
  text: '#ffffff',
  card: '#1e1e1e',
  button: '#ff6600',
};

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // 'light' ou 'dark'
  const [themeName, setThemeName] = useState(systemTheme);

  const theme = useMemo(() => (themeName === 'dark' ? darkTheme : lightTheme), [themeName]);

  const toggleTheme = () => {
    setThemeName((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
