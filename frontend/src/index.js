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

// import all store actions
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import * as reviewActions from './store/reviews';
import * as userActions from './store/users';

// import context
import { ModalProvider } from './context/Modal';

const store = configureStore();

// if mode is not in production, expose window
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  // attach actions to window
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotActions = spotActions;
  window.reviewActions = reviewActions;
  window.userActions = userActions;
}

//? Root React functional component
const Root = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
