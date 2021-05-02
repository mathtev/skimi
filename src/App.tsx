import React from 'react';
import Header from './components/Header/Header';
import ThemeProvider from './components/Theme/ThemeProvider';

function App() {
  const isDark = localStorage.getItem('theme') === 'true';
  return (
    <ThemeProvider defaultDark={isDark}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
