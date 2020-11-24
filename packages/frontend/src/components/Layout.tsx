import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLoginTokenQuery } from '../generated/types-and-hooks';

export const Layout: React.FC = ({ children }) => {
  const { data } = useLoginTokenQuery();

  const loggedIn = !!data?.token || localStorage.getItem('loggedIn') === 'true';

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

          {loggedIn && (
            <>
              <LinkContainer to="/logdata">
                <Nav.Link>Log Data</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/visual">
                <Nav.Link>Data Visualizations</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/logout">
                <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
                
              <LinkContainer to="/AccountSettings">
                <Nav.Link href="/AccountSettings">Settings</Nav.Link>
              </LinkContainer>
            </>
          )}

          {!loggedIn && (
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
