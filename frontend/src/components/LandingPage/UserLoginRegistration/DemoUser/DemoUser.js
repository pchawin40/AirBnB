// frontend/src/components/LandingPage/UserLoginRegistration/DemoUser/DemoUser.js

// import react-redux
import { useDispatch } from "react-redux";

// import react-router-dom
import { NavLink, useHistory } from "react-router-dom";

// import store
import * as sessionActions from '../../../../store/session';

// import css
import './DemoUser.css';

//? DemoUser component
const DemoUser = () => {

  // invoke dispatch
  const dispatch = useDispatch();

  // invoke useHistory
  const history = useHistory();

  //? handleDemoClick
  const handleDemoClick = e => {
    // prevent page from refreshing
    e.preventDefault();

    const credential = 'john.smith@gmail.com';
    const password = 'secret password';

    const user = {
      credential,
      password
    };

    // dispatch login thunk action
    // handle and display errors if any
    dispatch(sessionActions.login(user)).catch(
      async res => {
        // parse error data
        const data = await res.json();

        // set any error data into validation errors
        console.error("data", data);
      }
    )

    return history.push("/");
  };

  return (
    <>
      <button id="demo-user-button"onClick={handleDemoClick}>
        Demo User 
      </button>
    </>
  );
};

// export DemoUser component
export default DemoUser;
