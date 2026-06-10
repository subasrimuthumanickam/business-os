import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // DIRECT STYLE MANIPULATION - This will override any CSS
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#ffffff';
      document.body.style.background = '#0a0a0a';
    } else {
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#000000';
      document.body.style.background = '#f5f5f5';
    }
    
    console.log('Theme changed to:', theme); // Check console to see if this runs
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggle clicked, current theme:', theme); // Check console
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};