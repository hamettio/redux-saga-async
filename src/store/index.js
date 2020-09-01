import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSagas from '../sagas';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middlewares))
    );

export default store;

sagaMiddleware.run(rootSagas);
