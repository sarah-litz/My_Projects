import React, { FormEvent, useState } from 'react';
import './../App.css';
import './../components/Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useLoginMutation } from '../generated/types-and-hooks';
import { Container, Form, Button, FormGroup, Col } from 'react-bootstrap';
import { Layout } from './Layout';
import { token } from '../store/cache';

function Register() {
  const [login] = useLoginMutation();
  const history = useHistory();

  const [newEmail, setEmail] = useState('');
  const [newPassword, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');

  //FUNCTION validateInput checks all fields that the user fills out, and if there are no errors, updates backend
  const validateInput = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //empty error message from any past messages
    setError('');

    const emailAddressRX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //const for regex to validate email
    const minLength = 6; //const for regex to validate password;  check minimum 6 characters    //(note for sarah) const lowerCaseLetters = /[a-z]/g; // regex for lowerCaseLetters, g=global

    //   Email Validation:

    if (newEmail === '') {
      //empty email field
      setError('Please enter your email.');
    } else if (!newEmail.match(emailAddressRX)) {
      //entered an invalid email
      setError('Please enter a valid email.');
    }
    /* ---------------------------------------------------------------------------------
                            backend additions needed below:   
    add error check that makes sure the entered email <newEmail> is not already in use by an existing user
-----------------------------------------------------------------------------------*/

    //   Password Validation:

    if (newPassword === '') {
      //empty pswd field
      setError('Please enter a password.');
    } else if (newPassword.length < minLength) {
      //entered an invalid pswrd field
      setError('Please enter a password containing at least 6 characters.');
    } else if (newPassword != passwordCheck) {
      //reentered password does not match
      setError('The passwords you entered do not match.');
    }

    /* ---------------------------------------------------------------------------------
                                backend additions needed below:   
  if no errors: 
      create new user instance, set their email and password (and first/last name maybe? )
-----------------------------------------------------------------------------------*/
    // Register/Login new user and save their token
    if (!error) {
      /*const { data } = await login({ variables: { email,  } });
        if (data?.loginUser) {
          // TODO: auth token
          token(data.loginUser.email);
          history.push('/');
        } else {
          token(undefined);
        }*/
    }
  };

  return (
    <Layout>
      <div className="register mycard card col-12 col-lg-4 login-card hv-center">
        <form onSubmit={validateInput}>
          <Form className="form-group text-center">
            <h3> New User </h3> <br></br>
            {/*Enter first and last name fields*/}
            <Form.Row className="row vertical-middle">
              <Col>
                <Form.Control placeholder="First name" />
              </Col>
              <Col>
                <Form.Control placeholder="Last name" />
              </Col>
            </Form.Row>
            <br></br>
            {/*Enter email field*/}
            <Form.Group controlId="formGroupEmail">
              <Form.Label htmlFor="emailAddress" srOnly>
                EmailAddress
              </Form.Label>
              <input
                type="email"
                className="form-control"
                id="newEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
                value={newEmail}
              />
            </Form.Group>
            {/*Password Fields*/}
            <Form.Group controlId="formGroupPassword">
              <Form.Label htmlFor="newPassword" srOnly>
                password
              </Form.Label>
              <input
                type="password"
                placeholder="Enter password (6 or more characters)"
                id="newPassword"
                className="form-control"
                required
                onChange={(event) => setPassword(event.target.value)}
                value={newPassword}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPasswordCheck">
              <Form.Label htmlFor="passwordCheck" srOnly>
                password{' '}
              </Form.Label>
              <input
                type="password"
                placeholder="Reenter password"
                id="passwordCheck"
                className="form-control"
                required
                onChange={(event) => setPasswordCheck(event.target.value)}
                value={passwordCheck}
              />
            </Form.Group>
            {error && (
              <label id="error-message" style={{ color: 'red' }}>
                {error}
              </label>
            )}
            <div id="createAccount">
              <button className="button btn btn-md btn-primary" type="submit">
                Create Account
              </button>
            </div>
          </Form>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
//          REACT COMPONENT : REGISTRATION
/*
    return (   //HTML (always goes inside of return statement)

    <Layout>
    <div className="mycard card col-12 col-lg-4 login-card hv-center">
      <Form className="form-group text-center">
        <Form.Row className="row vertical-middle">
          <Col> 
            < Form.Control placeholder="First name" />
          </Col>
          <Col>
            < Form.Control placeholder="Last name" />
          </Col>
        </Form.Row>

        <br></br>
        <Form.Group controlId = "formGroupEmail">
          <Form.Label htmlFor="emailAddress" srOnly>EmailAddress</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />



        </Form.Group>
      </Form>
    </div>
  </Layout>
    
    );
  }
  



  */
