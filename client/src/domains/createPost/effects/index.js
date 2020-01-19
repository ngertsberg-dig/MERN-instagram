import * as actions from '../actions';
const headers = {
    "Accept":"application/json",
    "Content-Type":"application/json"
}
const submitCreatePost = async ( store, { type, post }) => {
    if(type === actions.SUBMIT_CREATE_POST){
        const data = await fetch("/api/post/createPost",{
            headers,
            method:"POST",
            body: JSON.stringify(post)
        })
    }
}

export default [
    submitCreatePost
];