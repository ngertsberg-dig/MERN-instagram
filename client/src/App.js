import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import './App.sass';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Notification from './components/Notification/Notification';
import Pages from './components/Pages/Pages';
import store from './store';
import { Provider } from 'react-redux';
window.store = store;

class App extends React.Component {
  render(){
    return (
      <Provider store = {store}>
        <div id = "App" className="App">
          <Router>
            <HeaderNav />
            <Pages state = {this.state}/>
            <Notification />
          </Router>
        </div>
      </Provider>
    );
  }
}



export default App;
