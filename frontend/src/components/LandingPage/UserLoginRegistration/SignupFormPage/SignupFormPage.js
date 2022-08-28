// frontend/src/components/SignupFormPage/SignupFormPage.js

// import react
import { useState, useRef } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { Redirect } from 'react-router-dom';

// import store
import * as sessionActions from '../../../store/session';

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
   * image: new user's image
   * images: new user's images
   * validationErrors: new user's validation errors
   */
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [image, setImage] = useState(null);

  // for multiple image file upload
  // const [images, setImages] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // invoke useDispatch
  const dispatch = useDispatch();

  //! to fix image and ref when invalid sign up [currently everything reset except for image (i.e. when ref reset, image does not)]
  // invoke useRef
  const ref = useRef();

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
      password,
      image
    };
 
    // reset form data to default value after signing up
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
    setImage(ref);

    // reset ref value
    ref.current.value = "";

    // dispatch signup thunk action
    // handle and display errors if any
    dispatch(sessionActions.signup(user)).catch(
      async res => {
        // parse error data
        const data = await res.json();

        // set any error data into validation errors
        if (data.errors) setValidationErrors(Object.values(data.errors));
      }
    );
  };

  //? updateFile: single file update function
  const updateFile = e => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  //? updateFiles: multiple file update function
  // const updateFiles = e => {
  //   const files = e.target.files;
  //   setImages(files);
  // }

  // return rendered form
  return (
    <div>
      {/* //? Display Errors (if any) */}
      <h1>AWS S3 Express-React-Demo</h1>
      <form onSubmit={handleSubmit}>
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
        
        {/* //? Single File Upload */}
        {/* //* putting ref clears file input upon invalid submission */}
        <input type="file" onChange={updateFile} ref={ref} />

        {/* //? Multiple File Upload */}
        {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
        
        {/* //? Sign Up Button*/}
        <button type="submit">
          Sign Up
        </button>
      </form>

    <div>
        {sessionUser && (
          <div>
            <h1>{sessionUser.username}</h1>
            <img
              style={{ width: "150px" }}
              src={sessionUser.profileImageUrl}
              alt="profile"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupFormPage;
