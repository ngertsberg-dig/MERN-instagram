import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Users from './Users/Users';
import Home from './Home/Home';
const Pages = () =>{
    return(
        <Switch>
            <Route path = '/users'>
                <Users />
            </Route>
            <Route path = '/'>
                <Home />
            </Route>
        </Switch>
    )
}

export default Pages;

