import * as actions from '../actions';

const initialState = {
    user: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case(actions.LOGIN_USER):
            return { ...state, user: action.user}
        case(actions.LOGOUT_USER_CLIENT):
            return { ...state, user:null }
        case(actions.UPDATE_USER_STATE):
            return { ...state, user: action.user }  
        default:
            return state;
    }
}