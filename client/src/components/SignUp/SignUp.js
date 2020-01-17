import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../domains/user/actions';

class SignUp extends React.Component{
    handleRegistration(e){
        e.preventDefault();
        const FormDat = new FormData(document.querySelector("#signUpForm"));
        const FormValues = {name:FormDat.get("name"),email:FormDat.get("email"),password:FormDat.get("password")};
        this.props.registerUser(FormValues);
    }
    render(){
        return(
            <div className = 'wrapper'>
                <div className = 'header'>
                    <p>Sign Up</p>
                </div>
                <form id = 'signUpForm' onSubmit = {(e)=>this.handleRegistration(e)}>
                    <input name = 'name' type = 'text' placeholder = 'Name'></input>
                    <input name = 'email' type = 'text' placeholder = 'email'></input>
                    <input name = 'password' type = 'password' placeholder = 'Password'></input>
                    <button type = 'submit'>SIGN UP</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    registerUser: FormValues => dispatch(actions.registerUserAttempt(FormValues))
})

export default connect(null,mapDispatchToProps)(SignUp);