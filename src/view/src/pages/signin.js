import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
const SignUp = ({ history }) => {
  useEffect(() => {
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNUP_USER, {
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
