import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import table from '../components/tableReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  table
});

const configureStore = () => createStore(
  rootReducer,
  composeEnhancers(applyMiddleware())
);

export default configureStore;
