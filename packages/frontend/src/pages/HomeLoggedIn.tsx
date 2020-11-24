import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import './DataVis.css';

export const LoggedInHome: React.FC = () => {
  return (
    <Layout>
      <Jumbotron className="container-style">
        <h1>Welcome to Bed Buddy!</h1>
        <p>
          By clicking the corresponding button above, you can log sleep data or
          view a visualized version of your current sleep data!
        </p>
      </Jumbotron>
    </Layout>
  );
};
