import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './domains/reducer';
import effects from './domains/effects';

const effectsMiddlewares = effects.map(effect => store => next => action => {
	next(action);
	effect(store, action);
});

export default createStore(rootReducer,applyMiddleware(thunk,logger,...effectsMiddlewares));
