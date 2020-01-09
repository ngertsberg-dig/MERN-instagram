import React from 'react';
import './Modal.sass';


const exitModal = () =>{
    document.querySelectorAll(".modal").forEach(function(modal){
        if(modal.classList.contains("active")){
            modal.classList.remove("active");
        }
    })
}

function backgroundClickExit(e){
    if(e.target.classList.contains("active","modal") && !e.target.classList.contains("modal-change-profile-pic")){
        exitModal();
    }
}
const Modal = ({ children,name }) =>{
    const classname = `modal modal-${name}`;
    return(
        <div className = {classname} onClick = {(e)=>backgroundClickExit(e)}>
            <div className = 'modal-wrapper'>
                <div onClick = {()=>exitModal()} className = 'exit-modal'>X</div>
                {children}
            </div>
        </div>
    )
}
export default Modal;