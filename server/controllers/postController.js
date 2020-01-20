const Post = require("../models/postModels");
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dfm327szl', 
    api_key: '919975629572391', 
    api_secret: 'yWllDVoR4vjzT49ecF3w7fp1OaM' 
});

exports.createPost = (req,res) => {
    const dateCreated = new Date();
    const { postTitle, postContent, postImage, user } = req.body;
    const userID = user._id;
    const userName = user.name;
    if(postImage){
        cloudinary.uploader.upload(postImage,{ overwrite: true,  public_id: `${userName}/posts/${new Date()}` }, function(error,result){
            if(!error){
                const postImagePublicId = result.public_id;
                const postImage = result.url;
                const newPost = new Post({ postTitle, postContent, dateCreated, userID, userName, postImagePublicId, postImage  });
                newPost.save().then(()=>{
                    res.json({ message: "Uploaded post succesfully!", type:"success" })
                });
            }else{
                console.log(error);
                res.json({ message: "something went wrong :(", type:"error" })
            }
        })
    }else{
        const newPost = new Post({ postTitle, postContent, dateCreated, userID, userName  });
        newPost.save().then(()=>{
            res.json({ message: "Uploaded post succesfully!", type:"success" })
        })
    }
}   