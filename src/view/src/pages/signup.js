import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation, useApolloClient, gql } from '@apollo/client';

const SignUp = (props) => {
  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });
  const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
      signUp(email: $email, username: $username, password: $password)
    }
  `;
  const client = useApolloClient();
  const [singUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      console.log(data.singUp);
    },
  });

  const [values, setValues] = useState();

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(values);
        }}
      >
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username:</Form.Label>
          <Form.Control
            required
            type='text'
            id='username'
            name='username'
            placeholder='username'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email:</Form.Label>
          <Form.Control
            required
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password:</Form.Label>
          <Form.Control
            required
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            onChange={onChange}
          />
        </Form.Group>
        <Button type='submit' variant='dark'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
