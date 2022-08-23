// frontend/src/store/index.js

// TODO: Setting up the Redux store

// import createStore, combineReducers, applyMiddleware, and compose from redux package
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// import thunk
import thunk from 'redux-thunk';

//? rootReducer
const rootReducer = combineReducers({
  
});

// enhancer...
let enhancer;

// ... in production mode, apply only thunk middleware 
if (process.env.NODE_ENV === 'production')
  enhancer = applyMiddleware(thunk);
// ... in development mode, apply thunk, thunk middleware, and dev tools
else {
	const logger = require('redux-logger').default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

//? configureStore
const configureStore = preloadedState => createStore(rootReducer, preloadedState, enhancer);

// export configureStore
export default configureStore;
