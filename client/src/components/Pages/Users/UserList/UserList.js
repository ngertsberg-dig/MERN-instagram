import React from 'react';
import User from './User/User';

const UserList = (props) =>{
    //map all users into and mark them as either not being followed or followed..
    const userListHTML = 
        props.allUsers.map((el,index)=>{
            const loopUserId = el._id;
            if(loopUserId !== props.currentUser._id){
                let currentUserFollowing = false;
                props.currentUserFollowing.forEach(el=>{
                    const userFollowing = el._id;
                    if(loopUserId === userFollowing){
                        currentUserFollowing = true;
                    }
                });   
                if(currentUserFollowing){
                    return <User currentUser = {props.currentUser} key = {index} following = {true} user = {el} name = {el.name} />
                }
                else{
                    return <User currentUser = {props.currentUser} key = {index} following = {false} user = {el} name = {el.name} />
                }
            }
            return 0;
        })
    return(
        <div className = "user-following-list">
            <ul>    
                {userListHTML}
            </ul>
        </div>
    )
}
export default UserList;