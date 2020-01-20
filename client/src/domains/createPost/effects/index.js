import * as actions from '../actions';
import * as globalActions from '../../global/actions';

const headers = {
    "Accept":"application/json",
    "Content-Type":"application/json"
}
const submitCreatePost = async ( store, { type, post }) => {
    if(type === actions.SUBMIT_CREATE_POST){
        if(post.postContent.length == 0){
            store.dispatch(globalActions.notificationPopup({ message:"Please input some post content!", type:"error" }));
            return;
        }
        const data = await fetch("/api/post/createPost",{
            headers,
            method:"POST",
            body: JSON.stringify(post)
        })
        const res = await data.json();
        console.log(post);
        store.dispatch(globalActions.notificationPopup({ message: res.message, type: res.type }))
    }
}

export default [
    submitCreatePost
];