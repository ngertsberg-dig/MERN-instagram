import React from 'react';

const Following = ({ name }) =>{
    return(
        <div>
            following: {name}
        </div>
    )
}
const NotFollowing = ({ name }) =>{
    return(
        <div>
            Not following: {name}
        </div>
    )
}
const UserList = (props) =>{
    const userListHTML = 
        props.userFollowingList.userListExcludeCurrent.map((el,index)=>{
            const loopUserId = el._id;
            let currentUserFollowing = false;
            props.userFollowingList.currentUserFollowers.forEach(el=>{
                const userFollowing = el._id;
                if(loopUserId === userFollowing){
                    currentUserFollowing = true;
                }
            });   
            if(currentUserFollowing){
                return <Following key = {index} name = {el.name} />
            }
            else{
                return <NotFollowing key = {index} name = {el.name} />
            }
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