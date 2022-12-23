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
  const { avgReview, setAvgReview } = useReview();
  const { spots, setSpots } = useSpot();
  

  /**
   * Selector Functions
   */
  const allReviews = useSelector(reviewActions.getAllReviews);
  const averageReviews = useSelector(allReviews ? reviewActions.getAverageReviews : 0);

  /**
   * UseEffect
   */
  // on load...
  useEffect(() => {
    // ... restore session user and set is loaded to true
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
    dispatch(spotActions.thunkGetSpots());
    dispatch(reviewActions.thunkGetReviews());
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
    if (allReviews && averageReviews > 0) {
      setAvgReview(averageReviews);
    }
  }, [allReviews, avgReview]);

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
