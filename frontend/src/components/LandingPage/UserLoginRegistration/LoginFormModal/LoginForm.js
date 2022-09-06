// frontend/src/components/LoginFormPage/LoginForm.js

// import react
import { useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { Redirect, useHistory } from 'react-router-dom';

// import session store
import * as sessionActions from '../../../../store/session';


// TODO: LoginFormPage component
//? holds all the files for login form
const LoginForm = ({ setShowModal }) => {

  // dispatch
  const dispatch = useDispatch();

  // invoke history
  const history = useHistory();

  // getSessionUser: get current session user
  const currentUser = useSelector(sessionActions.getSessionUser);

  /**
   * Controlled Inputs:
   * ------------------
   * credential: Username or Email
   * password: User Password
   * validationErrors: Errors from inputs
   */
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  //? Handle Submit
  // if there is current session user, redirect user to '/'
  if (currentUser) return <Redirect to='/' />;

  // function to handle form on submit
  const handleSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // user to login
    const user = {
      credential,
      password
    };

    // reset validation errors before dispatching
    setValidationErrors([]);

    // dispatch login thunk action
    // handle and display errors if any
    return dispatch(sessionActions.login(user)).catch(
      async res => {
        // parse error data
        const data = await res.json();

        // set any error data into validation errors
        if (data) setValidationErrors(Object.values([data.message]));
      }
    );
  }

  // return login form
  return (
    <section className="login-container" style={{ zIndex: 1000 }}>
      <i
        className="fa-solid fa-x"
        id="login-x-icon"
        onClick={_ => setShowModal(false)}
      />
      <aside className="login-form-header"><h1>Log in</h1></aside>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <h2 className="login-form-container-header">Welcome to Airbnb</h2>
        {/* //? Display Errors (if any) */}
        <ul>
          {
            validationErrors.map(error => <li key={error} className="error-list">{error}</li>)
          }
        </ul>

        <div className="modal-login-inputs-container">
          {/* //? Username */}
          <input
            placeholder="Email"
            type='credential'
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
          />

          {/* //? Password */}
          <input
            placeholder="Password"
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="modal-button-containers">
          {/* //? Log In Button */}
          <button className="modal-login-button" type="submit">
            Log In
          </button>
          {/* //? Log In Button */}
          <button className="modal-register-button" onClick={_ => history.push('/signup')}>
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
