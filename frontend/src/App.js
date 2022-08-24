
// import react-router-dom
import { Switch, Route, Redirect } from 'react-router-dom';

// import react-redux
import { useDispatch } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

// import components
import LoginFormPage from './components/LoginFormPage';

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
  }, [dispatch]);

  return (
      isLoaded && (
        <Switch>
          {/* //? route: / */}
          <Route exact path='/'>
            <h1>
              Home Page
            </h1>
          </Route>

          {/* //? route: /login */}
          <Route path='/login'>
            {/* LoginFormPage component */}
            <LoginFormPage />
          </Route>
        </Switch>
      )
  );
}

export default App;
