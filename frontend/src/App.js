// frontend/src/App.js

// import react-router-dom
import { Switch, Route } from 'react-router-dom';

// import react-redux
import { useDispatch } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

// import store 
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';

// import components
import SignupFormPage from './components/LandingPage/UserLoginRegistration/SignupFormPage';
import LandingPage from './components/LandingPage';
import Spot from './components/Spot';
import HostSpot from './components/HostSpot';
import CreateSpot from './components/HostSpot/CreateSpot';
import ResourceNotFound from './components/ResourceNotFound';

function App() {

  // invoke dispatch
  const dispatch = useDispatch();

  // state: isLoaded 
  const [isLoaded, setIsLoaded] = useState(false);

  // on load...
  useEffect(() => {
    // ... restore session user and set is loaded to true
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
    dispatch(spotActions.getSpots());
  }, [isLoaded, dispatch]);

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
          <Route exact path="/spots/:spotId">
            <Spot isLoaded={isLoaded} />
          </Route>

          {/* //? spot create welcome */}
          <Route path="/host/homes">
            <HostSpot/>
          </Route>

          {/* //? spot create */}
          <Route path="/host/create-spot">
            <CreateSpot/>
          </Route>

          
          {/* //? resource not found */}
          <Route>
            <ResourceNotFound/>
          </Route>
        </Switch>
      </section>
    ) 
  );
}

export default App;
