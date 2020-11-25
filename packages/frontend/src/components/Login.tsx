import React, { FormEvent, useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useLoginMutation } from '../generated/types-and-hooks';
import { token } from '../store/cache';
import { Layout } from '../components/Layout';
import { Alert } from 'react-bootstrap';
import { login } from '../helper/login';

// *note: put any other imports below so that CSS from your components takes precedence over default styles.

function Login() {
  //          REACT COMPONENT : LOGIN PAGE

  const [loginUser, { error: loginError }] = useLoginMutation({
    errorPolicy: 'all'
  });
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateInput = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //          VALIDATEINPUT() called from RETURN() function below
    /*  Function Description: triggered by onClick event. When user clicks "sign in" this checks to make sure the user entered valid values into both the email and password fields. */
    //  Initialize constiables

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

    //   Password Validation:

    if (password === '') {
      //empty pswd field
      setError('Please enter a password.');
    } else if (password.length < minLength) {
      //entered an invalid pswrd field
      setError('Please enter a password containing at least 6 characters.');
    }

    /*-----------------  

        if (email is valid)
                backend stuff to make sure that the user entered the correct password that is linked with their email. 
                
        -------------------*/

    // logins in user and saves their token
    if (!error) {
      console.log({ email, password });
      const { data } = await loginUser({ variables: { email, password } });
      console.log({ variables: { email, password }, data });

      if (data?.loginUser) {
        token(data.loginUser);
        login();
        history.push('/');
      } else {
        token(undefined);
      }
    }
  };

  return (
    //              HTML (always goes inside of return statement)

    //{/* USERNAME AND PASSWORD BOXES */}
    <Layout>
      <div className="mycard card col-12 col-lg-4 login-card hv-center">
        <form onSubmit={validateInput}>
          <div className="form-group text-center">
            {loginError && <Alert variant="danger">{loginError.message}</Alert>}
            <h3>Welcome Back!</h3>
            <label>Sign in below to access your Bed Buddy account.</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          {error && (
            <label id="error-message" style={{ color: 'red' }}>
              {error}
            </label>
          )}
          <div id="idParent">
            <div id="idChild">
              <button className="button btn btn-md btn-primary" type="submit">
                Sign in
              </button>
            </div>

            <div id="idChild">
              <Link className="button btn btn-sm btn-primary" to="/register">
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Login;

/*<div
style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}

className="main-area"
> 
      {// end username and password boxes }
  </div>*/
