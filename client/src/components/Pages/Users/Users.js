import React from 'react';
import NotLoggedInError from '../../NotLoggedInError';
import UserList from './UserList/UserList';

class Users extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: props.state.user,
            userFollowingList: null
        }
    }
    async componentDidMount(){
        console.log(this.state.user)
        if(this.state.user != null){
            const res = await fetch("/api/user/getAllUserFollowing",{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                method:"POST",
                body:JSON.stringify({currentUser: this.state.user._id})
            })
            const userFollowingList = await res.json();
            this.setState({ userFollowingList });
            console.log(userFollowingList);
        }
    }
    render(){
        let userList;
        if(this.state.user == null){
            userList = <NotLoggedInError />
        }
        else{
            if(this.state.userFollowingList == null){
                userList = null;
            }
            else{
                userList = <UserList userFollowingList = {this.state.userFollowingList} />
            }
        }
        return(
            <div className = 'page-view users'>
                <div className = 'wrapper'>
                    {userList}
                </div>
            </div>
        )
    }
}

export default Users;