import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../domains/user/actions';

class Login extends React.Component{

    async loginUser(e){
        e.preventDefault();
        const FormDat = new FormData(document.querySelector("#logInForm"));
        this.props.loginUser({name:FormDat.get("name"),password:FormDat.get("password")})
        
    }

    render(){
        return(
            <div className = 'wrapper'>
                <div className = 'header'>
                    <p>Log in</p>
                </div>
                <form id = 'logInForm' onSubmit = {(e)=>this.loginUser(e)}>
                    <input name = 'name' type = 'text' placeholder = 'Name'></input>
                    <input name = 'password' type = 'password' placeholder = 'Password'></input>
                    <button type = 'submit'>LOGIN</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: user => dispatch(actions.sendLoginRequest(user))
})

export default connect(null,mapDispatchToProps)(Login);