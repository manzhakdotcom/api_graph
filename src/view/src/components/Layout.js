import React from 'react';
import Navigation from './Navigation';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navigation />
      <main className='py-3'>
        <Container>{children}</Container>
      </main>
    </React.Fragment>
  );
};

export default Layout;
