import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { useLoginTokenQuery } from '../generated/types-and-hooks';

export const HomePage: React.FC = () => {
  const { data } = useLoginTokenQuery();

  const loggedIn = !!data?.token || localStorage.getItem('loggedIn') === 'true';

  return (
    <Layout>
      <Jumbotron>
        <h1>Welcome to Bed Buddy!</h1>
        {loggedIn ? (
          <p>
            By clicking the corresponding button above, you can log sleep data
            or view a visualized version of your current sleep data!
          </p>
        ) : (
          <>
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
          </>
        )}
      </Jumbotron>
    </Layout>
  );
};
