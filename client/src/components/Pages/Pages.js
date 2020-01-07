import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Users from './Users/Users';
import Home from './Home/Home';
const Pages = ( props ) =>{
    return(
        <Switch>
            <Route path = '/users'>
                <Users state = {props.state} />
            </Route>
            <Route path = '/'>
                <Home />
            </Route>
        </Switch>
    )
}

export default Pages;

