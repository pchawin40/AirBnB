// import css
import './SignUpFormPage.css';

// import react
import { useState, useRef } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { useHistory, Redirect } from 'react-router-dom';

// import store
import * as sessionActions from '../../../../store/session';
import HomeFooterBar from '../../HomeFooterBar';

//? SignupFormPage component
const SignupFormPage = () => {
  // invoke use history
  const history = useHistory();

  // invoke useRef
  const ref = useRef(null);

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

  //? handleScrollClick
  const handleScrollClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // get session user
  const sessionUser = useSelector(sessionActions.getSessionUser);

  //? handleSubmit: handle form submit

  // if session user exist, return to '/' path
  if (sessionUser) return <Redirect to='/' />;

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

  return (
    <section className="sign-up-form-page-container">
      {/* //? Sign Up Header */}
      <header className="sign-up-header">
        {/* //? Left Aside container */}
        <aside className="header-left-aside-container">
          {/* logo */}
          <figure className="sign-up-logo-container" onClick={_ => history.push('/')}>
            <i className="fa-brands fa-airbnb fa-3x sign-up-fa-airbnb"></i>
          </figure>

          {/* Text */}
          <section className="header-text-section">
            <main className="header-container">
              <h1>Open your door to hosting</h1>
            </main>
            {/* Button to Sign Up */}
            <button className="sign-up-host-button" onClick={handleScrollClick}>
              Try hosting
            </button>

            {/* down arrow */}
            <i className="fa-solid fa-angle-down sign-up-angle-down" onClick={handleScrollClick}></i>
          </section>

        </aside>

        {/* //? Right Side container */}
        <aside className="header-right-aside-container">
          {/* video */}
          <video
            className="sign-up-welcome-video"
            autoPlay
            loop
          >
            <source src="https://a0.muscache.com/v/a9/a7/a9a7873c-95de-5e37-8995-a5abb5b6b02f/a9a7873c95de5e378995a5abb5b6b02f_4000k_1.mp4" type="video/mp4" />
          </video>

          {/* play button */}
          <figure>
            <i className="fa-solid fa-play"></i>
          </figure>
        </aside>
      </header>

      {/* 
        //? Sign Up Main 
      */}
      <main className="sign-up-main" ref={ref}>
        {/* main header */}
        <section className="main-section-header">
          <h1>You can host</h1>
          <h1>anything, anywhere</h1>
        </section>

        {/* picture carousel */}
        <section className="main-pic-carousel">
          <section className="inner-main-pic-carousel">

            {/* image 1 */}
            <img src='https://i.picsum.photos/id/1018/3914/2935.jpg?hmac=3N43cQcvTE8NItexePvXvYBrAoGbRssNMpuvuWlwMKg' alt="img 1" />

            {/* image 2 */}
            <img src='https://i.picsum.photos/id/101/2621/1747.jpg?hmac=cu15YGotS0gIYdBbR1he5NtBLZAAY6aIY5AbORRAngs' alt="img 2" />

            {/* image 3 */}
            <img src={`https://i.picsum.photos/id/1041/5184/2916.jpg?hmac=TW_9o6HeD7H7I7NVo-S1Fa1iAvzQ10uvmJqsXvNoi0M`} alt="img 3" />

          </section>
        </section>
      </main>

      {/* //? Sign Up Form */}
      <section className="sign-up-form-container">
        <section className="sign-up-form-left">
          <form className="sign-up-form" onSubmit={handleSubmit} ref={ref}>

            <h2>
              Welcome to Airbnb
            </h2>

            <ul className="sign-up-error-list">
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
            {/* <div className="form-image-upload-container"> */}
            {/* <span>Your profile picture:</span> */}
            {/* <input id="form-image-upload" type="file" onChange={updateFile} /> */}
            {/* </div> */}

            {/* //? Multiple File Upload */}
            {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}

            {/* //? Sign Up Button*/}
            <button className="sign-up-submit-button" type="submit">
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
                  alt="profile sign-up"
                />
              </div>
            )}
          </div>

        </section>
        <section className="sign-up-form-right">
          <img src="https://a0.muscache.com/im/pictures/f409b291-8b55-4780-81c3-a067062982d1.jpg?im_w=2560&im_q=highq" alt="form img" />
        </section>
      </section>

      <HomeFooterBar mapState={false} />
    </section>
  );
};

// export component
export default SignupFormPage;
