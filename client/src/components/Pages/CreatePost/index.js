import React from 'react';
import PageView from '../../Layout/PageView';
import CreatePostForm from './components/createPostForm';
import { connect } from 'react-redux';
import * as actions from '../../../domains/createPost/actions';

class CreatePost extends React.Component{
    state = {
        postImage: null,
        hasImage: false
    }
    constructor(){
        super();
        this.postImagePreview = this.postImagePreview.bind(this);
        this.checkAndLoadImage = this.checkAndLoadImage.bind(this);
        this.createPostSubmit = this.createPostSubmit.bind(this);
    }

    postImagePreview(){
        const photo = URL.createObjectURL(document.querySelector(".post-image-input").files[0]);
        document.querySelector('.post-image-preview img').setAttribute('src',photo);
        const file = document.querySelector(".post-image-input").files[0];
        this.checkAndLoadImage(file);

    }

    createPostSubmit(){
        const postTitle = document.querySelector(".post-title textarea").value;
        const postContent = document.querySelector(".post-content textarea").value;
        const post = { postTitle, postContent, postImage: this.state.hasImage ? this.state.postImage : null}
        this.props.submitPost(post);
    }

    checkAndLoadImage(file){
        let dataURL;
        window.data = dataURL;
        const reader = new FileReader();
        reader.addEventListener("load", ()=>{
            dataURL =  reader.result;
            this.setState({ postImage: dataURL, hasImage:true })
        })
        reader.readAsDataURL(file);
    }

    render(){
        return(
            <PageView class = "create-post">
                <CreatePostForm postImagePreview = {this.postImagePreview} submitPost = {this.createPostSubmit} />
            </PageView>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    submitPost: post => dispatch(actions.submitCreatePost(post))
})

export default connect(null,mapDispatchToProps)(CreatePost);