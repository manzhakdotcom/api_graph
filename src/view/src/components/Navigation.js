import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useQuery, gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Navigation = (props) => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Книги</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/mynotes'>
              <Nav.Link>My notes</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/favorites'>
              <Nav.Link>Favorites</Nav.Link>
            </LinkContainer>
            {data.isLoggedIn ? (
              <LinkContainer to='/'>
                <Nav.Link>Log Out</Nav.Link>
              </LinkContainer>
            ) : (
              <React.Fragment>
                <LinkContainer
                  onClick={() => {
                    localStorage.removeItem('token');
                    client.resetStore();
                    client.writeQuery({
                      query: IS_LOGGED_IN,
                      data: { isLoggedIn: false },
                    });
                    props.history.push('/');
                  }}
                >
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/signup'>
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
