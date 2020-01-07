import React from 'react';

const Login = (props) =>{
    return(
        <div className = 'wrapper'>
            <div className = 'header'>
                <p>Log in</p>
            </div>
            <form id = 'logInForm' onSubmit = {props.LoginUser}>
                <input name = 'name' type = 'text' placeholder = 'Name'></input>
                <input name = 'password' type = 'password' placeholder = 'Password'></input>
                <button type = 'submit'>LOGIN</button>
            </form>
        </div>
    )
}

export default Login;