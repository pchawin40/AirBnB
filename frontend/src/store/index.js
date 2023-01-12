// frontend/src/store/index.js

// TODO: Setting up the Redux store

// import createStore, combineReducers, applyMiddleware, and compose from redux package
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// import thunk
import thunk from 'redux-thunk';

// import reducer
import sessionReducer from './session';
import mapsReducer from './maps';
import spotsReducer from './spots';
import reviewsReducer from './reviews';
import usersReducer from './users';
import bookingsReducer from './bookings';

//? rootReducer
const rootReducer = combineReducers({
	session: sessionReducer,
	maps: mapsReducer,
	spots: spotsReducer,
	reviews: reviewsReducer,
	users: usersReducer,
	bookings: bookingsReducer
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
