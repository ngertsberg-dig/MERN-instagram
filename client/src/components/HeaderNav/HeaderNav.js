import React from 'react';
import './HeaderNav.sass';

function popupModal(e){
    const button = e.target;
    const modalPopup = document.querySelector(`.modal-${button.getAttribute('data-modal')}`);
    if(!modalPopup.classList.contains("active")){
        modalPopup.classList.add("active");
    }
}
const HeaderNav =  () =>{
    return(
        <div id = 'HeaderNav'>
            <div className = 'login-portal'>
                <div className = 'login'>
                    <button onClick = {(e)=>popupModal(e)} id = 'login' data-modal = 'login'>Login</button>
                </div>
                <div className = 'sign-up'>
                    <button onClick = {(e)=>popupModal(e)} id = 'signUp' data-modal = 'sign-up'>Sign up</button>
                </div>
            </div>
        </div>
    )
}
export default HeaderNav;