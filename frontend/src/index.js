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

const store = configureStore();

// if mode is not in production, expose window

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
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
