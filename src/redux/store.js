import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from '../utils/logger';
import monitorReducerEnhancer from '../utils/monitorReducer';
import { persistStore } from 'redux-persist';
import rootReducer from './root.reducer';

const middlewares = [logger, thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, composedEnhancers);
const persistor = persistStore(store);
export { store, persistor };
