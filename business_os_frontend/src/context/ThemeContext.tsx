// // src/context/ThemeContext.tsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// type ThemeMode = 'light' | 'dark';

// interface ThemeContextType {
//   theme: ThemeMode;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   // Check localStorage for saved theme or default to 'dark' (white UI on black bg)
//   const [theme, setTheme] = useState<ThemeMode>(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return (savedTheme as ThemeMode) || 'dark';
//   });

//   useEffect(() => {
//     // Apply theme to document root
//     const root = document.documentElement;
//     if (theme === 'dark') {
//       root.classList.add('theme-dark');
//       root.classList.remove('theme-light');
//     } else {
//       root.classList.add('theme-light');
//       root.classList.remove('theme-dark');
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => prev === 'dark' ? 'light' : 'dark');
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

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
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Update localStorage
    localStorage.setItem('theme', theme);
    
    // Update document class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};