import React from 'react';
import './Notification.sass';
import { connect } from 'react-redux';
import { notificationPopup } from '../../helpers/helper';
import * as actions from '../../domains/global/actions';

class Notification extends React.Component{
    componentDidUpdate(){
        if(this.props.notificationPopup){
            notificationPopup(this.props.notificationPopup.message,this.props.notificationPopup.type);
            this.props.resetNotificationPopup();
        }
    }
    render(){
        return(
            <div id = 'notification'>
                <p>Default Message</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    notificationPopup: state.GlobalReducer.notificationPopup
})

const mapDispatchToProps = dispatch => ({
    resetNotificationPopup: () => dispatch(actions.notificationPopupReset())
})

export default connect(mapStateToProps,mapDispatchToProps)(Notification);