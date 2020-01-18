import * as actions from '../actions';

const devMode = true;
const testData = {"following":[],"_id":"5e1744b11ebdc40ccd3cac53","name":"nickey22","email":"g","password":"gunit2","profilePic":{"url":"http://res.cloudinary.com/dfm327szl/image/upload/v1579294787/q839wp2hx2pubx9furxb.jpg","public_id":"q839wp2hx2pubx9furxb"},"__v":0};

const initialState = {
    user: devMode ? testData : null
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