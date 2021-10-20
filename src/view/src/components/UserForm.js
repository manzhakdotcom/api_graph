import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ action, formType }) => {
  const [values, setValues] = useState();

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <h2>{formType === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          action({
            variables: {
              ...values,
            },
          });
          console.log(values);
        }}
      >
        {formType === 'signup' && (
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
        )}

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

export default UserForm;
