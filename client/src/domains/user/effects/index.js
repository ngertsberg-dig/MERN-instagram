import * as actions from '../actions';
import * as globalActions from '../../global/actions';

const checkIfLogged = async (store, { type }) =>{
    if(type === actions.CHECK_IF_LOGGED){
        const res = await fetch("/api/user/checkIfLogged");
        const data = await res.json();
        if(data.success){
            console.log("token active.. authenticating user..");
            store.dispatch(actions.loginUser(data.user));
        }
    }
}

const logoutUserServer = async (store, { type }) =>{
    if(type === actions.LOGOUT_USER_SERVER){
        const res = await fetch("/api/user/logout");
        const data = await res.json();
        if(data.success){
            store.dispatch(actions.logoutUserClient());
        }
        store.dispatch(globalActions.notificationPopup({ message: data.message, type: data.type }));
    }
  }

const loginUser = async (store, { type, user }) =>{
    if(type === actions.SEND_LOGIN_REQUEST){
        const res = await fetch("/api/user/login",{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({ name: user.name, password: user.password })
        })
        const json = await res.json();
        if(json.type === 'success'){
            const user = json.user;
            store.dispatch({ type:actions.LOGIN_USER, user });
        }
        store.dispatch(globalActions.notificationPopup({ message:json.message, type:json.type }));
    }
}

const registerUser = async ( store, { type, FormValues }) => {
    if(type === actions.REGISTER_USER_ATTEMPT){
        const res = await fetch("/api/user/signup",{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({ FormValues })
        })
        const json = await res.json();
        store.dispatch(globalActions.notificationPopup({ message:json.message, type:json.type }));
    }
}

const newUserPicUploaded = ( store, { type, payload }) => {
    if( type === actions.NEW_USER_PIC_UPLOADED){
        const { userObject, newPic } = payload;
        const newObject = {...userObject};
        newObject.profilePic.url = newPic;
        store.dispatch(actions.updateUserState(newObject));
    }
}

const getAllUserFollowing = async ( store, { type, userID }) =>{
    if(type === actions.GET_USER_FOLLOWING){
        const res = await fetch("/api/user/getAllUserFollowing",{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({currentUser: userID})
        })
        const data = await res.json();
        store.dispatch(actions.returnUserFollowing(data));
    }
}

export default [
    checkIfLogged,
    logoutUserServer,
    loginUser,
    registerUser,
    newUserPicUploaded,
    getAllUserFollowing
];