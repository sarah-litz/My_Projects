import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <Jumbotron>
        <h1>Welcome to Bed Buddy!</h1>
        <p>Register to get started:</p>
        <Link to="/register">
          <Button variant="primary">Register</Button>
        </Link>
        <p>
          <br></br>
        </p>
        <p>Or login:</p>
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>
      </Jumbotron>
    </Layout>
  );
};
