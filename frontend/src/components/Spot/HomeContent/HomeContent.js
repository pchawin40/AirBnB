// frontend/src/Component/Spot/HomeContent/HomeContent.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import css
import './HomeContent.css';

// import store
import * as userActions from '../../../store/users';


//? HomeContent component
const HomeContent = () => {

  //! to fix find users 

  // invoke dispatch
  const dispatch = useDispatch();

  // to get owner name
  const users = useSelector(userActions.getAllUsers);

  useEffect(() => {
    dispatch(userActions.thunkLoadUsers());
  }, [dispatch]);
  console.log("users", users);

  return (
    <>
      {/* Title */}
      <section className="home-content-section-container">
        <section className="home-content-title-section">
          <p>Home hosted by<span></span></p>

          {/* include user image */}

          <p>2 guests • 1 bed • 0 baths</p>
        </section>
      </section>
    </>
  );
}

// export component
export default HomeContent;
