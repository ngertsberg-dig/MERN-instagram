import React from 'react';
import UserList from './UserList/UserList';
import { connect } from 'react-redux';
import PageView from '../../Layout/PageView';
import * as actions from '../../../domains/user/actions';

class Users extends React.Component{

    async componentDidMount(){
        this.props.getUserFollowing(this.props.user._id);
    }
    render(){
        let userList;
        if(this.props.userListExcludeCurrent){
            userList = <UserList currentUser = {this.props.user} currentUserFollowing = {this.props.currentUserFollowing} allUsers = {this.props.userListExcludeCurrent} />;
        }
        else{
            userList = null;
        }
        return(
            <PageView class = 'users'>
                <div className = 'wrapper'>
                   {userList}
                </div>
            </PageView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.UserReducer.user,
    userListExcludeCurrent: state.UserReducer.userListExcludeCurrent,
    currentUserFollowing: state.UserReducer.currentUserFollowing
})

const mapDispatchToProps = dispatch => ({
    getUserFollowing: userID => dispatch(actions.getUserFollowing(userID))
})

export default connect(mapStateToProps,mapDispatchToProps)(Users);