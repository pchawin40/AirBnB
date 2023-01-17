// frontend/src/App.js

// import react-router-dom
import { Switch, Route } from 'react-router-dom';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

// import store 
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import * as reviewActions from './store/reviews';
import * as bookingActions from './store/bookings';
import * as userActions from './store/users';

// import context
import SpotProvider, { useSpot } from './context/SpotContext';
import { useReview } from './context/ReviewContext';

// import components
import SignupFormPage from './components/LandingPage/UserLoginRegistration/SignupFormPage';
import LandingPage from './components/LandingPage';
import Spot from './components/Spot';
import HostSpot from './components/HostSpot';
import CreateSpot from './components/HostSpot/CreateSpot';
import ResourceNotFound from './components/ResourceNotFound';
import SpotForm from './components/HostSpot/CreateSpot/SpotForm';

function App() {

  // invoke dispatch
  const dispatch = useDispatch();

  /**
   * Controlled inputs
   */
  // state: isLoaded 
  const [isLoaded, setIsLoaded] = useState(false);
  const { spots, setSpots } = useSpot();


  /**
   * Selector Functions
   */
  const allReviews = useSelector(reviewActions.getAllReviews);
  const sessionUser = useSelector(sessionActions.getSessionUser);

  /**
   * UseEffect
   */
  // on load...
  useEffect(() => {
    // ... restore session user and set is loaded to true
    dispatch(reviewActions.thunkGetReviews());
    dispatch(userActions.thunkLoadUser());
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
    dispatch(spotActions.thunkGetSpots());

    if (sessionUser) {
      // call to dispatch to get booking
      dispatch(bookingActions.thunkGetUserBookings());
    }
  }, [isLoaded, dispatch]);

  /**
    * Selector functions
   */
  // get spot
  const spotState = useSelector(spotActions.getAllSpots);

  /**
   * UseEffect
   */
  // per all reviews
  useEffect(() => {
    // nothing for now
  }, [allReviews]);

  // per spot state
  useEffect(() => {
    if (spotState) {
      setSpots(spotState);
    }
  }, [spotState]);

  return (
    isLoaded && (
      <section id="app-container">

        <Switch>
          <Route exact path="/">
            {/* //? Landing Page */}
            <LandingPage isLoaded={isLoaded} />
          </Route>

          {/* //? route: / */}
          <Route path="/signup">
            {/* SignupFormPage component */}
            <SignupFormPage />
          </Route>

          {/* //? spot detail */}
          <Route exact path="/rooms/:spotId">
            <Spot isLoaded={isLoaded} />
          </Route>

          {/* //? spot create welcome */}
          <Route path="/host/homes">
            <HostSpot />
          </Route>

          {/* //? spot create */}
          <Route path="/host/create-spot">
            <CreateSpot />
          </Route>

          {/* //? resource not found */}
          <Route>
            <ResourceNotFound />
          </Route>
        </Switch>
      </section>
    )
  );
}

export default App;
