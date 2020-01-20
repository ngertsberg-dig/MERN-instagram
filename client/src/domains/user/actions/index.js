export const CHECK_IF_LOGGED = "CHECK_IF_LOGGED";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER_SERVER = "LOGOUT_USER_SERVER";
export const LOGOUT_USER_CLIENT = "LOGOUT_USER_CLIENT";
export const SEND_LOGIN_REQUEST = "SEND_LOGIN_REQUEST";
export const REGISTER_USER_ATTEMPT = "REGISTER_USER_ATTEMPT";
export const NEW_USER_PIC_UPLOADED = "NEW_USER_PIC_UPLOADED";
export const UPDATE_USER_STATE = "UPDATE_USER_STATE";
export const GET_USER_FOLLOWING = "GET_USER_FOLLOWING";
export const RETURN_USER_FOLLOWING = "RETURN_USER_FOLLOWING";

export const updateUserState = user => ({ type:UPDATE_USER_STATE, user });
export const checkIfLogged = () => ({ type:CHECK_IF_LOGGED });
export const loginUser = user => ({ type:LOGIN_USER, user })
export const logoutUserServer = () => ({ type:LOGOUT_USER_SERVER });
export const logoutUserClient = () => ({ type:LOGOUT_USER_CLIENT });
export const sendLoginRequest = user => ({ type:SEND_LOGIN_REQUEST, user});
export const registerUserAttempt = FormValues => ({ type:REGISTER_USER_ATTEMPT, FormValues });
export const newUserPicUploaded = payload => ({ type:NEW_USER_PIC_UPLOADED, payload });
export const getUserFollowing = userID => ({ type:GET_USER_FOLLOWING , userID });
export const returnUserFollowing = payload => ({ type:RETURN_USER_FOLLOWING, payload });