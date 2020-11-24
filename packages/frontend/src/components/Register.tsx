import React, { FormEvent, useState } from 'react';
import './../components/Login.css';
import { Alert, Form } from 'react-bootstrap';
import { Layout } from './Layout';
import { useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../generated/types-and-hooks';
import { token } from '../store/cache';
import { login } from '../helper/login';

const Register: React.FC = () => {
  const [register, { error: backendError }] = useRegisterMutation({
    errorPolicy: 'all'
  });
  const history = useHistory();

  const [firstname, setFirst] = useState('');
  const [lastname, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');

  // checks all fields that the user fills out, and if there are no errors, updates backend
  const validateInput = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //empty error message from any past messages
    setError('');

    const emailAddressRX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //const for regex to validate email
    const minLength = 6; //const for regex to validate password;  check minimum 6 characters    //(note for sarah) const lowerCaseLetters = /[a-z]/g; // regex for lowerCaseLetters, g=global

    //   Email Validation:

    if (email === '') {
      //empty email field
      setError('Please enter your email.');
    } else if (!email.match(emailAddressRX)) {
      //entered an invalid email
      setError('Please enter a valid email.');
    }
    /* ---------------------------------------------------------------------------------
                            backend additions needed below:   
    add error check that makes sure the entered email <email> is not already in use by an existing user
-----------------------------------------------------------------------------------*/

    //   Password Validation:

    if (password === '') {
      //empty pswd field
      setError('Please enter a password.');
      return;
    } else if (password.length < minLength) {
      //entered an invalid pswrd field
      setError('Please enter a password containing at least 6 characters.');
      return;
    } else if (password !== passwordCheck) {
      //reentered password does not match
      setError('The passwords you entered do not match.');
      return;
    }

    /* ---------------------------------------------------------------------------------
                                backend additions needed below:   
  if no errors: 
      create new user instance, set their email and password (and first/last name maybe? )
-----------------------------------------------------------------------------------*/
    // Register/Login new user and save their token
    if (!error) {
      const { data } = await register({
        variables: { firstname, lastname, email, password }
      });
      if (data?.addUser) {
        token(data.addUser);
        login();
        history.push('/');
      } else {
        token(undefined);
      }
    }
  };

  return (
    <Layout>
      <div className="register mycard card col-12 col-lg-4 login-card hv-center">
        <Form className="form-group text-center" onSubmit={validateInput}>
          <h3> New User </h3> <br></br>
          {backendError?.graphQLErrors.map((error) => (
            <Alert variant="danger">{error.message}</Alert>
          ))}
          {/*Enter first and last name fields*/}
          <Form.Group controlId="formGroup">
            <Form.Label htmlFor="firstName" srOnly>
              First Name
            </Form.Label>
            <input
              type="firstname"
              className="form-control"
              id="firstname"
              placeholder="Enter first name"
              onChange={(event) => setFirst(event.target.value)}
              value={firstname}
            />
          </Form.Group>
          <Form.Group controlId="formGroup">
            <Form.Label htmlFor="lastName" srOnly>
              Last Name
            </Form.Label>
            <input
              type="lastname"
              id="lastname"
              className="form-control"
              placeholder="Enter last name"
              onChange={(event) => setLast(event.target.value)}
              value={lastname}
            />
          </Form.Group>
          {/*Enter email field*/}
          <Form.Group controlId="formGroupEmail">
            <Form.Label htmlFor="emailAddress" srOnly>
              Email Address
            </Form.Label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </Form.Group>
          {/*Password Fields*/}
          <Form.Group controlId="formGroupPassword">
            <Form.Label htmlFor="password" srOnly>
              Password
            </Form.Label>
            <input
              type="password"
              placeholder="Enter password (6 or more characters)"
              id="password"
              className="form-control"
              required
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPasswordCheck">
            <Form.Label htmlFor="passwordCheck" srOnly>
              Confirm password
            </Form.Label>
            <input
              type="password"
              placeholder="Re-enter password"
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
      </div>
    </Layout>
  );
};

export default Register;
