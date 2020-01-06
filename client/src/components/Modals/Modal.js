import React from 'react';
import './Modal.sass';


const exitModal = () =>{
    document.querySelectorAll(".modal").forEach(function(modal){
        if(modal.classList.contains("active")){
            modal.classList.remove("active");
        }
    })
}
const Modal = ({ children,name }) =>{
    const classname = `modal modal-${name}`;
    return(
        <div className = {classname}>
            <div className = 'modal-wrapper'>
                <div onClick = {()=>exitModal()} className = 'exit-modal'>X</div>
                {children}
            </div>
        </div>
    )
}
export default Modal;