import Layout from './components/Layout/Layout';
import ThemeProvider from './providers/ThemeProvider';

function App() {
  const isDark = localStorage.getItem('theme') === 'true';
  return (
    <ThemeProvider defaultDark={isDark}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
