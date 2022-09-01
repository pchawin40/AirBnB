// import css
import './SignUpFormPage.css';

// import react-redux
import { useEffect, useRef } from 'react';

// import react-router-dom
import { useHistory } from 'react-router-dom';

//? SignupFormPage component
const SignupFormPage = () => {
  // invoke use history
  const history = useHistory();

  // invoke useRef
  const ref = useRef(null);

  //? handleScrollClick
  const handleScrollClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="sign-up-form-page-container">
      {/* //? Sign Up Header */}
      <header className="sign-up-header">
        {/* //? Left Aside container */}
        <aside className="header-left-aside-container">
          {/* logo */}
          <figure className="sign-up-logo-container" onClick={_ => history.push('/')}>
            <i class="fa-brands fa-airbnb fa-3x sign-up-fa-airbnb"></i>
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
            <i class="fa-solid fa-angle-down sign-up-angle-down" onClick={handleScrollClick}></i>
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
            <i class="fa-solid fa-play"></i>
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
              <img src='https://i.picsum.photos/id/1018/3914/2935.jpg?hmac=3N43cQcvTE8NItexePvXvYBrAoGbRssNMpuvuWlwMKg' />


              {/* image 2 */}
              <img src='https://i.picsum.photos/id/101/2621/1747.jpg?hmac=cu15YGotS0gIYdBbR1he5NtBLZAAY6aIY5AbORRAngs' />



              {/* image 3 */}
              <img src={`https://i.picsum.photos/id/1008/5616/3744.jpg?hmac=906z84ml4jhqPMsm4ObF9aZhCRC-t2S_Sy0RLvYWZwY`} />


          </section>

          <section>
            {/* article */}

          </section>
        </section>

        {/* user's quote */}
        <section>

        </section>
      </main>

      {/* //? Sign Up Form */}
      <section className="sign-up-form">
        <form>

        </form>
      </section>

      {/* //? Footer */}
      <footer className="sign-up-footer">
        {/* //? Spot Footer */}
      </footer>
    </section>
  );
};

// export component
export default SignupFormPage;
