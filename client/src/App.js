import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import './App.sass';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Notification from './components/Notification/Notification';
import Pages from './components/Pages/Pages';
import { notificationPopup } from './helpers/helper';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null
    }

    this.state={
      user: {"following":[{"_id":"5e14f48e9421bd2299e2e6fe"}],"_id":"5e14f1f9fead0c220f2a006d","name":"nickey22","email":"gertsberg@hotmail.com","password":"gunit2","__v":5}
    }

    this.logoutUser = this.logoutUser.bind(this);
  }
  async registerUser(e){
    e.preventDefault();
    const FormDat = new FormData(document.querySelector("#signUpForm"));
    const FormValues = {name:FormDat.get("name"),email:FormDat.get("email"),password:FormDat.get("password")};
    const res = await fetch("/api/user/signup",{
          headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
          method:"POST",
          body:JSON.stringify({ FormValues })
      })
    const json = await res.json();
    if(res.status === 401){
      notificationPopup("error",json);
    }
    else{
      notificationPopup("success",json);
    }
  }

  async loginUser(e){
    e.preventDefault();
    const FormDat = new FormData(document.querySelector("#logInForm"));
    const res = await fetch("/api/user/login",{
      headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
      method:"POST",
      body:JSON.stringify({ name:FormDat.get("name"), password:FormDat.get("password") })
      })
    const json = await res.json();
    notificationPopup(json.type,json.message);
    if(json.type === 'success'){
      document.querySelectorAll(".modal").forEach(function(modal){
        if(modal.classList.contains("active")){
            modal.classList.remove("active");
          }
        })
        this.setState({user:json.user,loggedIn:true});
    }
  }

  async logoutUser(){
    const res = await fetch("/api/user/logout");
    const data = await res.json();
    if(data.success){
      notificationPopup("success",data.message);
      this.setState({
        user: null
      })
    }

  }
  async componentDidMount(){
    const res = await fetch("/api/user/checkIfLogged");
    const data = await res.json();
    console.log(data.message);
    console.log(data)
    if(data.success){
      console.log("token active.. authenticating user..");
      this.setState({
          user: data.user
      })
    }
  }
  

  render(){
    return (
      <div id = "App" className="App">
        <Router>
          <HeaderNav LoginUser = {(e)=>this.loginUser(e)} RegisterUser = {(e)=>this.registerUser(e)} user = {this.state.user} logout = {this.logoutUser} />
          <Pages state = {this.state}/>
          <Notification />
        </Router>
      </div>
    );
  }
}



export default App;
