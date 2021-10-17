import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './App.css';
import Pages from './pages';

const uri = '/api';
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri,
  cache,
  cannectToDevTools: true,
});

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
