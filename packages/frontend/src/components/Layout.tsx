import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Layout: React.FC = ({ children }) => {
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

          <LinkContainer to="/login">
            <Nav.Link href="/login">Login</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/register">
            <Nav.Link href="/register">Register</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};
