
// import react-router-dom
import { Switch, Route } from 'react-router-dom';

import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
