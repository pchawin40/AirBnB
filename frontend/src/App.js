
// import react-router-dom
import { Switch, Route } from 'react-router-dom';

import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <>
    <Switch>
      <Route path='/login'>
        {/* LoginFormPage component */}
        <LoginFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
