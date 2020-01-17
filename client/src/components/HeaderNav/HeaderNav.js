import React from 'react';
import './HeaderNav.sass';
import Modal from '../Modals/Modal';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Navigation from './Navigation/Navigation';
import ProfilePicCrop from '../PhotoCrop/ProfilePicCrop';
import UserLogged from './UserLogged';
import { connect } from 'react-redux';

import * as actions from '../../domains/user/actions';

function popupModal(e){
    const button = e.target;
    const modalPopup = document.querySelector(`.modal-${button.getAttribute('data-modal')}`);
    if(!modalPopup.classList.contains("active")){
        modalPopup.classList.add("active");
    }
}

class HeaderNav extends React.Component{
    componentDidMount(){
        this.props.checkIfLogged();
    }
    render(){
        const { user } = this.props;
        return(
            <React.Fragment>
                <div id = 'HeaderNav'>
                    <div className = 'user-header'>
                        {user == null ? 
                            <LoginScreen /> 
                        : 
                            <UserLogged />
                        }
                    </div>
                    {user == null? null :
                        <div className = 'navigation'>
                            <Navigation />
                        </div>
                    }
                </div>
                {user == null ? null : <Modal name='change-profile-pic'><ProfilePicCrop /></Modal>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.UserReducer.user
})

const mapDispatchToProps = dispatch => ({
    checkIfLogged: () => dispatch(actions.checkIfLogged())
})

const LoginScreen = (props) =>{
    return(
        <React.Fragment>
            <div className = 'login-portal'>
                <div className = 'login'>
                    <button onClick = {(e)=>popupModal(e)} id = 'login' data-modal = 'login'>Login</button>
                </div>
                <div className = 'sign-up'>
                    <button onClick = {(e)=>popupModal(e)} id = 'signUp' data-modal = 'sign-up'>Sign up</button>
                </div>
            </div>
            <Modal name='login'><Login /></Modal>
            <Modal name = 'sign-up'><SignUp /></Modal>
        </React.Fragment>
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(HeaderNav);