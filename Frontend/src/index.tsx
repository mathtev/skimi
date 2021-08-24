import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  ApolloProvider,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Layout from './components/Layout/Layout';
import Learn from './pages/learn';
import ThemeProvider from './providers/ThemeProvider';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:5000/graphql' }),
]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  const isDark = localStorage.getItem('theme') === 'true';
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider defaultDark={isDark}>
        <Layout />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;


ReactDOM.render(<App />, document.getElementById('root'));
