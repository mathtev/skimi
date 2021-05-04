import Layout from './components/Layout/Layout';
import ThemeProvider from './components/Theme/ThemeProvider';

function App() {
  const isDark = localStorage.getItem('theme') === 'true';
  return (
    <ThemeProvider defaultDark={isDark}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
