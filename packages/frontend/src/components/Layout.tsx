import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLoginTokenQuery } from '../generated/types-and-hooks';

export const Layout: React.FC = ({ children }) => {
  const { data } = useLoginTokenQuery();

  const loggedIn = !!data?.token;

  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand href="/">Glootie</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Nav className="ml-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>

          {loggedIn ? (<>
            <LinkContainer to="/visual">
                <Nav.Link href="/visual">View SleepData</Nav.Link>
              </LinkContainer>
          </>) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link href="/login">Login</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/register">
                <Nav.Link href="/register">Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};
