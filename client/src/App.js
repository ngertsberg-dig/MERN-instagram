import React from 'react';
import './App.css';
import './App.sass';
import Modal from './components/Modals/Modal';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
class App extends React.Component {
  
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
      alert(json);
    }
    else{
      alert(json);
    }
  }

  render(){
    return (
      <div id = "App" className="App">
        <HeaderNav />
        <Modal name='login'><Login /></Modal>
        <Modal name = 'sign-up'><SignUp RegisterUser = {(e)=>this.registerUser(e)} /></Modal>
      </div>
    );
  }
}

export default App;
