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

    // this.state={
    //   user: {"following":[],"_id":"5e16708cd304e70dbd073fcc","name":"nickey22","email":"gertsberg","password":"gunit2","profilePic":"https://res.cloudinary.com/dfm327szl/image/upload/v1578528727/Default%20Images/user_dkmmxa.png","__v":0}
    // }
    this.changeUserProfilePicState = this.changeUserProfilePicState.bind(this);
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
  
  changeUserProfilePicState(newPic){
    if(this.state.user){
      const newUserObject = this.state.user;
      newUserObject.profilePic = newPic;
      console.log(newUserObject);
      this.setState({
        user: newUserObject
      })
    }
  }

  render(){
    return (
      <div id = "App" className="App">
        <Router>
          <HeaderNav changeProfilePic = {this.changeUserProfilePicState} LoginUser = {(e)=>this.loginUser(e)} RegisterUser = {(e)=>this.registerUser(e)} user = {this.state.user} logout = {this.logoutUser} />
          <Pages state = {this.state}/>
          <Notification />
        </Router>
      </div>
    );
  }
}



export default App;
