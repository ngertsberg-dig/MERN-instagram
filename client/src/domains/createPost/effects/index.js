import * as actions from '../actions';

const submitCreatePost = ( store, { type, post }) => {
    if(type === actions.SUBMIT_CREATE_POST){
        console.log(`[Submiting Post] ${JSON.stringify(post)}`);
    }
}

export default [
    submitCreatePost
];