// frontend/src/App.js

// import react-router-dom
import { Switch, Route } from 'react-router-dom';

// import react-redux
import { useDispatch } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

// import components
import LoginFormModal from './components/LoginFormModal';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';

// import session store 
import * as sessionActions from './store/session';

function App() {

  // invoke dispatch
  const dispatch = useDispatch();
  
  // state: isLoaded 
  const [isLoaded, setIsLoaded] = useState(false);

  // on load...
  useEffect(() => {
    // ... restore session user and set is loaded to true
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
  }, [isLoaded, dispatch]);

  return (
      isLoaded && (
      <>
        {/* //? ProfileButton */}
        <Navigation isLoaded={isLoaded} />
        <Switch>
          {/* //? route: / */}
          <Route path="/signup">
            {/* SignupFormPage component */}
            <SignupFormPage />
          </Route>
        </Switch>
      </>
      )
  );
}

export default App;
