import React from 'react';

const UserFollowingPosts = ({ postsToShow }) => (
    <div id = 'userFollowingPosts'>
        {postsToShow !== null && postsToShow.posts.map((el,index)=>(
            <div className = 'single-post' key = {index}>
                <div className = 'post-top'>
                    <div className = 'post-image'>
                        <img src = {el.postImage} alt = 'post image' />
                    </div>
                </div>
                <div className = 'post-bottom'>
                    <div className = 'post-title'>
                        <h5>{el.postTitle}</h5>
                    </div>
                    <div className = 'post-description'>
                        <p>{el.postContent}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

export default UserFollowingPosts;