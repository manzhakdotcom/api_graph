import React from 'react';
import { IS_LOGGED_IN } from './gql/query';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import './App.css';
import Pages from './pages';

const uri = '/api';
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  cannectToDevTools: true,
});

const data = {
  isLoggedIn: !!localStorage.getItem('token'),
};
cache.writeQuery({
  query: IS_LOGGED_IN,
  data,
});
client.onResetStore(() =>
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data,
  })
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Pages />
      </div>
    </ApolloProvider>
  );
};

export default App;
