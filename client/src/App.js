import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import './App.sass';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Notification from './components/Notification/Notification';
import TweenMax from 'gsap';
import { Power1 } from 'gsap/gsap-core';
import Pages from './components/Pages/Pages';
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null
    }

    // this.state={
    //   user: {"following":[{"_id":"5e14f48e9421bd2299e2e6fe"}],"_id":"5e14f1f9fead0c220f2a006d","name":"nickey22","email":"gertsberg@hotmail.com","password":"gunit2","__v":5}
    // }

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
      this.notificationPopup("error",json);
    }
    else{
      this.notificationPopup("success",json);
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
    this.notificationPopup(json.type,json.message);
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
      this.notificationPopup("success",data.message);
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
  
  notificationPopup(status,message){
    const notification = document.querySelector("#notification");
    if(!notification.classList.contains("active")){
      notification.classList.add(status,"active");
      notification.querySelector("p").textContent = message;
      
      TweenMax.set(notification,{display:"block"});
      TweenMax.from(notification,0.25,{opacity:0,y:200,ease:Power1.easeOut,onComplete:function(){
        TweenMax.to(notification,0.25,{opacity:0,y:100,delay:1,onComplete:function(){
          TweenMax.set(notification,{display:"none",y:0,opacity:1});
          notification.classList.remove("active",status);
        }})
      }});
    }
    else{
      const keepChecking = setInterval(()=>{
        const checkClass = document.querySelector("#notification").classList.contains("active");
        console.log(checkClass);
        if(!checkClass){
          clearInterval(keepChecking);
          this.notificationPopup(status,message);
        }
      },1000);
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
