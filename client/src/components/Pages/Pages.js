import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Users from './Users/Users';
import Home from './Home/Home';
import CreatePost from './CreatePost';

const Pages = ( props ) =>{
    return(
        <Switch>
            <Route path = '/users'>
                <Users state = {props.state} />
            </Route>
            <Route path = '/create-post'>
                <CreatePost />
            </Route>
            <Route path = '/'>
                <Home />
            </Route>
            
        </Switch>
    )
}

export default Pages;

