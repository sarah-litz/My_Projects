import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import './../App.css';
import '../components/Login.css';
import { Layout } from '../components/Layout';
import { Form, Button, Collapse, Modal } from 'react-bootstrap';
import { useMeEmailQuery } from '../generated/types-and-hooks';
import {
  useChangeEmailMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation
} from '../generated/types-and-hooks';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { logout } from '../helper/login';
import { useLoginTokenQuery } from '../generated/types-and-hooks';

function Settings() {
  //TODO: return values of mutation?? rn they are set to strings and i just return a random word cuz didn't know what to return.
  //const history = useHistory();

  const loggedIn =
    !!useLoginTokenQuery().data?.token ||
    localStorage.getItem('loggedIn') === 'true'; //is user logged in true/false

  const [changeEmail, { error: emailError }] = useChangeEmailMutation({
    errorPolicy: 'all'
  });

  const [changePassword, { error: passwordError }] = useChangePasswordMutation({
    errorPolicy: 'all'
  });

  const [
    deleteAccount,
    { error: deleteAccountError }
  ] = useDeleteAccountMutation({
    errorPolicy: 'all'
  });

  const [open, setOpen] = useState(false); // change email button
  const [openPassword, setOpenPassword] = useState(false); // change password button

  const [error, setError] = useState(''); // change email error
  const [newEmail, setNewEmail] = useState(''); // updates when user enters new email
  const [email, setEmail] = useState(''); // keeps track of user's current email

  const [password, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');

  //      Delete Account Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //      DISPLAY USER'S EMAIL
  const { data } = useMeEmailQuery();
  if (!data?.me) return <Redirect to="/" />;
  if (email !== data.me.email) {
    setEmail(data.me.email);
  }

  //        CHANGE EMAIL
  const validateEmail = async (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    setError(''); //empty error message from any past messages

    const emailAddressRX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //const for regex to validate email

    //   Email Validation:

    if (newEmail === '') {
      //empty email field
      setError('Enter an email');
    } else if (!newEmail.match(emailAddressRX)) {
      //entered an invalid email
      setError('You have not entered a valid email.');
    }

    if (!error) {
      await changeEmail({ variables: { email, newEmail } });
      //update the current user's email, mutation needed.
      console.log(data.me.email); //TODO: not updating user's email here?

      /*setEmail(newEmail);
      setNewEmail('');*/

      await logout();
      //history.push("/");
      //logout();
      return <Redirect to="/" />;
    }
  };

  //              CHANGE PASSWORD
  const validatePassword = async (event: FormEvent<HTMLFormElement>) => {
    //event.preventDefault();
    setError(''); //empty error message from any past messages
    const minLength = 6; //const for regex to validate password;  check minimum 6 characters    //(note for sarah) const lowerCaseLetters = /[a-z]/g; // regex for lowerCaseLetters, g=global

    //   Password Validation:

    if (password === '') {
      //empty pswd field
      setError('Please enter a password.');
      return;
    } else if (password.length < minLength) {
      //entered an invalid pswrd field
      setError('Please enter a password containing at least 6 characters.');
      return;
    } else if (password !== newPasswordCheck) {
      //reentered password does not match
      setError('The passwords you entered do not match.');
      return;
    }
    console.log('new password is valid');
    //if (!error) {
    await changePassword({ variables: { password } });

    console.log('changePassword mutation called. ');
    logout();
    return <Redirect to="/" />;
    //console.log('redirect to home');
    //}
  };

  //          DELETE ACCOUNT
  const deleteMyAccount = async (event: FormEvent<HTMLFormElement>) => {
    console.log('delete my account called');
    if (!loggedIn) {
      console.log('you must be logged in to delete your account!');
      return <Redirect to="/" />;
    }

    await deleteAccount();
    logout();
    console.log('deleteAccount mutation called.');
    return <Redirect to="/" />;
  };

  //      LOGOUT AND REDIRECT USER TO HOMEPAGE
  const Logout = async (event: FormEvent<HTMLFormElement>) => {
    logout();
    return <Redirect to="/" />;
  };

  return (
    //  HTML
    <Layout>
      <div className="jumbotron text-center color-scheme">
        <h3>Account Settings</h3>
      </div>

      <div>
        <div id="DisplayEmail">
          <label>Your Email: </label>
          <label id="YourEmail"> {email} </label>
        </div>
        <br></br>
        <div>
          <Button
            className="btn btn-light"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Change Email
          </Button>
          <Collapse in={open}>
            <div>
              <div id="example-collapse-text">
                <form onSubmit={validateEmail}>
                  <div className="input-group mb-3">
                    {emailError && (
                      <Alert variant="danger">{emailError.message}</Alert>
                    )}
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter the new email you would like to use."
                      onChange={(event) => setNewEmail(event.target.value)}
                      value={newEmail}
                    />
                    <button
                      className="button btn-outline-secondary"
                      type="submit"
                    >
                      submit
                    </button>
                  </div>
                </form>
                {error && (
                  <label id="error-message" style={{ color: 'red' }}>
                    {error}
                  </label>
                )}
              </div>
            </div>
          </Collapse>
        </div>
        <br></br>

        {/*     Change Password     */}
        <div>
          <div>
            <Button
              className="btn btn-light"
              onClick={() => setOpenPassword(!openPassword)}
              aria-controls="example-collapse-text"
              aria-expanded={openPassword}
            >
              Change Password
            </Button>
            <Collapse in={openPassword}>
              <div>
                <div id="example-collapse-text">
                  <form onSubmit={validatePassword}>
                    {/*Password Fields*/}
                    {passwordError && (
                      <Alert variant="danger">{passwordError.message}</Alert>
                    )}
                    <Form.Label htmlFor="password" srOnly>
                      Password
                    </Form.Label>
                    <input
                      type="password"
                      placeholder="Enter new password (6 or more characters)"
                      id="password"
                      className="form-control"
                      required
                      onChange={(event) => setNewPassword(event.target.value)}
                      value={password}
                    />

                    <Form.Group controlId="formGroupPasswordCheck">
                      <Form.Label htmlFor="passwordCheck" srOnly>
                        Confirm password
                      </Form.Label>
                      <input
                        type="password"
                        placeholder="Reenter password"
                        id="passwordCheck"
                        className="form-control"
                        required
                        onChange={(event) =>
                          setNewPasswordCheck(event.target.value)
                        }
                        value={newPasswordCheck}
                      />
                    </Form.Group>

                    <button
                      className="button btn-outline-secondary"
                      type="submit"
                    >
                      submit
                    </button>
                  </form>
                  {error && (
                    <label id="error-message" style={{ color: 'red' }}>
                      {error}
                    </label>
                  )}
                </div>
              </div>
            </Collapse>
          </div>
        </div>
        <br></br>

        <div>
          {/*   Button trigger modal   */}
          <Button
            type="button"
            className="btn btn-primary"
            variant="light"
            onClick={handleShow}
          >
            Delete Account
          </Button>
          {/*   Modal   */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You are about to delete your account. Once deleted, you will be
              unable to recover your sleep data.{' '}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Go Back
              </Button>
              <form onSubmit={deleteMyAccount}>
                <Button variant="primary" type="submit">
                  {deleteAccountError && (
                    <Alert variant="danger">{deleteAccountError.message}</Alert>
                  )}
                  I'm Sure!
                </Button>
              </form>
            </Modal.Footer>
          </Modal>
        </div>
        <br></br>

        <div>
          <form onSubmit={Logout}>
            <Button variant="light" type="submit">
              Logout
            </Button>
          </form>
        </div>
        <br></br>
      </div>
    </Layout>
  );
}

export default Settings;
