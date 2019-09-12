import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import thoughtsReducer from './reducers/thoughtsReducer';
import uiReducer from './reducers/uiReducer';

// redux store stuff
const initialState = {};

const rootReducer = combineReducers({
  user: userReducer,
  thoughts: thoughtsReducer,
  UI: uiReducer,
})

// redux persist stuff
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [reduxThunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middlewares),
  )
)

export const persistor = persistStore(store);

export default store;
