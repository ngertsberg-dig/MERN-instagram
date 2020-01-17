import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../domains/user/actions';
function profilePicCropActivate(){
    document.querySelector(".modal.modal-change-profile-pic").classList.add("active");
}

const UserLogged = (props) =>{
    const { user } = props;
    return(
        <div className = 'user-logged-in'>
            <div className = 'left-side'>
                <div className = 'profile-pic'>
                    <img onClick = {profilePicCropActivate} src = {user.profilePic.url} alt = 'profile-pic'/>
                </div>
            </div>
            <div className = 'right-side'>
                <p className = 'user-name'>{user.name}</p>
                <p className = 'logout' onClick = {props.logoutUser}>Logout</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.UserReducer.user
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(actions.logoutUserServer())
})

export default connect(mapStateToProps,mapDispatchToProps)(UserLogged);