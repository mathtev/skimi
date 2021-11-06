import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Layout from './components/Layout';
import ThemeProvider from './context/theme/ThemeProvider';
import SettingsProvider from './context/settings/SettingsProvider';
import AppStateProvider from './context/appState/AppStateProvider';
import AuthProvider from './context/auth/AuthProvider';
import { BrowserRouter as Router } from "react-router-dom";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});

const apolloLink = ApolloLink.from([errorLink, link]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: apolloLink,
});

function App() {
  const isDark = localStorage.getItem('theme') === 'true';
  const defaultSettings = {
    learningLanguage: 'german',
    nativeLanguage: 'english',
  };
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider defaultDark={isDark}>
          <AuthProvider>
            <AppStateProvider>
              <SettingsProvider defaultSettings={defaultSettings}>
                <Layout />
              </SettingsProvider>
            </AppStateProvider>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
