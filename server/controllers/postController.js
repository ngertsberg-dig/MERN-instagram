const Post = require("../models/postModels");
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dfm327szl', 
    api_key: '919975629572391', 
    api_secret: 'yWllDVoR4vjzT49ecF3w7fp1OaM' 
});

exports.createPost = (req,res) => {
    const dateCreated = new Date();
    const { postTitle, postContent } = req.body;
    const numOfLikes = 0;
    const newPost = new Post({ postTitle, postContent, dateCreated });
    newPost.save().then(()=>{
        console.log("post created");
    })
}