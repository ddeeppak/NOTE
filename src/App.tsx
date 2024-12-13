import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './components/LandingPage';
import NoteDiary from './components/NoteDiary';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider>
      {!isAuthenticated ? (
        <LandingPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <NoteDiary />
      )}
    </ThemeProvider>
  );
}