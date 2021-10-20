import React from 'react';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  gql,
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
  query: gql`
    {
      isLoggedIn @client
    }
  `,
  data,
});
client.onResetStore(() =>
  cache.writeQuery({
    query: gql`
      {
        isLoggedIn @client
      }
    `,
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
