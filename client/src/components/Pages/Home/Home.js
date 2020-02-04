import React from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from 'react-redux';
import * as actions from 'domains/user/actions';
import UserFollowingPosts from './components/UserFollowingPosts';

class Home extends React.Component{

    componentDidUpdate(){
        if(this.props.user){
            this.getUsersFollowingPosts();
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        //gotta fix this :/
        if(nextProps.postsToShow && this.props.postsToShow){
            if(nextProps.postsToShow.posts === this.props.postsToShow.posts){
                return false;
            }
        }
        else{
            return true;
        }
    }
    async getUsersFollowingPosts(){
        const userID = this.props.user._id;
        this.props.getUserFollowingPosts(userID);
    }
    render(){
        const { postsToShow } = this.props;
        return(
            <div>
                {
                this.props.user ? 
                    postsToShow ? 
                        <UserFollowingPosts postsToShow = {postsToShow} /> 
                            : 
                        <p>Loading...</p>
                    : 
                <p>Please Login</p>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.UserReducer.user,
    postsToShow: state.UserReducer.postsToShow
})

const mapDispatchToProps = dispatch => ({
    getUserFollowingPosts: userID => dispatch(actions.getUserFollowingPosts(userID))
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);