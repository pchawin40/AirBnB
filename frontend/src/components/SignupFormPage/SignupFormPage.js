// frontend/src/components/SignupFormPage/SignupFormPage.js

// import react
import { useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { Redirect } from 'react-router-dom';

// import store
import * as sessionActions from '../../store/session';

//? SignupFormPage Functional Component
const SignupFormPage = () => {
  /**
   * Controlled Inputs:
   * ------------------
   * firstName: new user's first name
   * lastName: new user's last name
   * email: new user's email
   * password: new user's password
   * confirmedPassword: new user's confirmed password
   * validationErrors: new user's validation errors
   */
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  // invoke useDispatch
  const dispatch = useDispatch();

  // get session user
  const sessionUser = useSelector(sessionActions.getSessionUser);

  //? handleSubmit: handle form submit

  // if session user exist, return to '/' path
  if(sessionUser) return <Redirect to='/'/>;

  const handleSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // validation that confirm password is same as password fields
    if (confirmedPassword !== password) {
      // else if password does not match
      return setValidationErrors("Password does not match")
    }

    // reset validation errors
    setValidationErrors([]);

    // user to sign up
    const user = {
      firstName,
      lastName,
      email,
      password
    };
 
    // dispatch signup thunk action
    // handle and display errors if any
    return dispatch(sessionActions.signup(user)).catch(
      async res => {
        // parse error data
        const data = await res.json();

        // set any error data into validation errors
        if (data.errors) setValidationErrors(Object.values(data.errors));
      }
    );
  };

  // return rendered form
  return (
    <form onSubmit={handleSubmit}>
      {/* //? Display Errors (if any) */}
      <ul>
        {
          validationErrors.map(error => <li key={error}>{error}</li>)
        }
      </ul>
      
      {/* //? firstName */}
      <input
        placeholder="First name"
        type='firstName'
        onChange={e => setFirstName(e.target.value)}
        required
        value={firstName}
      >
      </input>

      {/* //? lastName */}
      <input
        placeholder="Last name"
        type='lastName'
        onChange={e => setLastName(e.target.value)}
        required
        value={lastName}
      >
      </input>

      {/* //? email */}
      <input
        placeholder="Email"
        type='email'
        onChange={e => setEmail(e.target.value)}
        required
        value={email}
      >
      </input>

      {/* //? password */}
      <input
        placeholder="Password"
        type='password'
        onChange={e => setPassword(e.target.value)}
        required
        value={password}
      >
      </input>

      {/* //? confirmedPassword */}
      <input
        placeholder="Confirm"
        type='password'
        onChange={e => setConfirmedPassword(e.target.value)}
        required
        value={confirmedPassword}
      >
      </input>

      {/* //? Sign Up Button*/}
      <button type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default SignupFormPage;
