import React, { useState } from 'react';
import { notificationPopup } from '../../../../../helpers/helper.js';

const requestHeaders = {"Accept":"application/json","Content-Type":"application/json"}

async function followButtonClicked(following,followingUserId,currentUser){
    if(following){
        console.log(`attempting to unfollow ${followingUserId}`);
        const res = await fetch("/api/user/removeFollowing",{method:"POST",headers:requestHeaders,body:JSON.stringify({currentUser,followingUserId})});
        const data = await res.json();
        if(data.success){
            console.log("successfully unfollowed!");
            notificationPopup(data.message,data.type);
            return 1;
        }else{
            notificationPopup(data.message,data.type);    
            return 0;
        };
    }else{
        console.log(`attempting to follow ${followingUserId}`);
        const res = await fetch("/api/user/addFollowing",{method:"POST",headers:requestHeaders,body:JSON.stringify({currentUser,followingUserId})});
        const data = await res.json();
        if(data.success){
            console.log('successfully followed!');
            notificationPopup(data.message,data.type);
            return 1;
        }else{
            notificationPopup(data.message,data.type);    
            return 0;
        };
    }
}

const FollowingButton = (props) =>{
    const [following,setFollowing] = useState(props.following);
    const { userID } = props;
    const buttonText = following ? <p>Following</p>:<p>Follow</p>;
    const buttonClass = following ? "unfollow":"follow";
    const followSwitch = async (following,userID) => {
        const callFollowAPI = await followButtonClicked(following,userID,props.currentUser._id);
        if(callFollowAPI){
            setFollowing(!following);
        }
    }
    return(
        <button onClick = {(e)=>followSwitch(following,userID)} className = {buttonClass}>{buttonText}</button>
    )
}
const User = (props) =>{
    const { user, following } = props;
    return(
        <div className = 'single-user'>
            <div className = 'left-side'>
                {props.following === true ? <p>Following: </p>:<p>Not Following: </p>}
                {props.name}
            </div>
            <div className = 'right-side'>
                <div className = 'follow-button'>
                    <FollowingButton currentUser = {props.currentUser} userID = {user._id} following = {following} />
                </div>
            </div>
        </div>
    )
}
export default User;