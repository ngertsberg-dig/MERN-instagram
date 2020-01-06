import React from 'react';

const SignUp = ({ RegisterUser }) =>{
    return(
        <div className = 'wrapper'>
            <div className = 'header'>
                <p>Sign Up</p>
            </div>
            <form id = 'signUpForm' onSubmit = {RegisterUser}>
                <input name = 'name' type = 'text' placeholder = 'Name'></input>
                <input name = 'email' type = 'text' placeholder = 'email'></input>
                <input name = 'password' type = 'password' placeholder = 'Password'></input>
                <button type = 'submit'>SIGN UP</button>
            </form>
        </div>
    )
}

export default SignUp;