import { combineReducers } from 'redux';
import UserReducer from './user/reducer';
import GlobalReducer from './global/reducer';

export default combineReducers({
    UserReducer,
    GlobalReducer
});