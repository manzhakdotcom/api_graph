import React from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path='/' component={Home} />
        <PrivateRoute path='/mynotes' component={MyNotes} />
        <PrivateRoute path='/favorites' component={Favorites} />
        <Route path='/note/:id' component={NotePage} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <Route
      {...rest}
      render={(props) =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default Pages;
