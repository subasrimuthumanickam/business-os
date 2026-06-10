// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';  // This path should be correct now
import App from './App';
import { ThemeProvider } from './context/ThemeContext'; 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
        <ThemeProvider> 
    <App />
      </ThemeProvider>
  </React.StrictMode>
);