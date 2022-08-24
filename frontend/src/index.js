// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
// import Provider from react-redux
import { Provider } from 'react-redux';
// import BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// import restoreCSRF, csrfFetch
import { restoreCSRF, csrfFetch } from './store/csrf';

// import configureStore from store index
import configureStore from './store';

// import all session actions
import * as sessionActions from './store/session';

const store = configureStore();

// if mode is not in production, expose window
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  // attach actions to window
  window.csrfFetch = csrfFetch;
  window.store = store;
  // Test Case: sessionActions.login({ user: { credential: "john.smith@gmail.com", password: "password"} });
  window.sessionActions = sessionActions;
}

//? Root React functional component
const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
