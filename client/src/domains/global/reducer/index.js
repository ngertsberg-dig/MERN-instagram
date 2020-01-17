import * as actions from '../actions';

const initialState = {
    notificationPopup: null
}

export default ( state = initialState, action ) => {
    switch(action.type){
        case actions.NOTIFICATION_POPUP:
            return { ...state, notificationPopup: action.info }
        case actions.NOTIFICATION_POPUP_RESET:
            return { ...state, notificationPopup: null }
        default:
            return state;
    }
} 