import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';
import {SIGNIN_USER} from '../gql/mutation';
import { IS_LOGGED_IN } from '../gql/query';

const SignUp = ({ history }) => {
  useEffect(() => {
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn);
      client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });
      console.log(data.signIn);
      history.push('/');
    },
  });

  return (
    <div>
      <UserForm action={signIn} formType='signin' />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </div>
  );
};

export default SignUp;
