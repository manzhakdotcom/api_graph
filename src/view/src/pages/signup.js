import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';
import { SIGNUP_USER } from '../gql/mutation';
import { IS_LOGGED_IN } from '../gql/query';

const SignUp = ({ history }) => {
  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp);
      client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });
      console.log(data.signUp);
      history.push('/');
    },
  });

  return (
    <div>
      <UserForm action={signUp} formType='signup' />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </div>
  );
};

export default SignUp;
