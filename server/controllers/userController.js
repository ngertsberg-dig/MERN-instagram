const User = require("../models/usersModels");
const cloudinary = require('cloudinary').v2;
const path = require("path");

cloudinary.config({ 
    cloud_name: 'dfm327szl', 
    api_key: '919975629572391', 
    api_secret: 'yWllDVoR4vjzT49ecF3w7fp1OaM' 
});

exports.signUpUser = (req,res,next) =>{
    const { name } = req.body.FormValues;
    User.findOne({ name }, (err, user) =>{
        if(err) throw err;
        if(user != null){
            res.status(401); 
            res.json({ message:"Username is taken!",type:"error" });
        }
        else{
            next();
        }
    });
}

exports.saveUserIntoDB = (req,res) => {
    const defaultProfilePicLink = "https://res.cloudinary.com/dfm327szl/image/upload/v1578528727/Default%20Images/user_dkmmxa.png";
    const { name, email, password } = req.body.FormValues;
    const newUser = new User({name,email,password,profilePic:{url:defaultProfilePicLink,public_id:0}});
    newUser.save().then(()=>{
        res.status(200);
        res.json({ message:"User created successfully",type:"success" })
    });
}

exports.loginValidation = (req,res) =>{
    const { name, password } = req.body;
    User.findOne({ name, password },(err,user)=>{
        if(err) throw err;
        if(user == null){
            res.status(401);
            res.json({message:"User not found",type:"error"});
        }
        //success
        else{
            req.session.user = user;
            res.json({ user, message:"Succesfully logged in.",type:"success" });
        }
    })
}

exports.checkIfLogged = (req,res) =>{
    if(req.session.user == undefined){
        res.json({ message:"No user logged",success:false });
    }
    else{
        const loggedInUserID = req.session.user._id;
        User.findOne({_id:loggedInUserID},(err,user)=>{
            if(err) throw err;
            if(user != null){
                res.json({ user, message:"Signed in user!",success:true });
            }
            else{
                console.log("couldnt find user :(");
            }
        })
        
    }
    
}

exports.logout = (req,res) =>{
    req.session.user = undefined;
    res.json({ message:"Successfully logged out",success:true,type:"success" });
}

exports.addFollowing = (req,res)=>{
    const { currentUser, followingUserId } = req.body;
    User.findOne({ _id: currentUser },(err,user)=>{
        if(err) throw err;
        if(user != null){
            const alreadyFollowing = user.following.some(el=>el._id == followingUserId);
            if(!alreadyFollowing){
                user.following.push({ _id: followingUserId });
                user.save();
                res.json({ message:"User Followed!",type:"success",success:true });
            }
            else{
                res.json({ message:"Already following User!",type:"error",success:false })
            }
        }
        else{
            res.json({ message:"Failed to find current user!",type:"error",success:false })
        }
    })
}

exports.removeFollowing = (req,res) => {
    const { currentUser, followingUserId } = req.body;
    User.findOne({ _id: currentUser },(err,user)=>{
        if(err) throw err;
        if(user != null){
            const alreadyFollowing = user.following.some(el=>el._id == followingUserId);
            if(alreadyFollowing){
                var newFollowingList = user.following.filter(el=>el._id != followingUserId);
                user.following = newFollowingList;
                user.save();
                res.json({message:"User unfollowed!",type:"success",success:true});
            }
            else{
                res.json({message:"Not following User!",type:"error",success:false})
            }
        }
        else{
            res.json({message:"Failed to find current user!",type:"error",success:false})
        }
    })
}

exports.getAllUserFollowing = (req,res) =>{
    const { currentUser } = req.body;
    User.find({},(err,user)=>{
        if(err) throw err;
        const userListExcludeCurrent = user.filter(el=>el._id !== currentUser);
        const currentUserFollowers = user.find(el=>el._id == currentUser).following;
        res.json({ userListExcludeCurrent, currentUserFollowers });
    })
}

exports.uploadProfileImage = (req,res,next)=>{
    const {profilePic} = req.body;
    cloudinary.uploader.upload(profilePic, function(error, result) {
        if(!error){
            req.body.newProfilePicURL = result.url;
            req.body.publicID = result.public_id;
            req.body.profilePic = "";
            next();
        }else{
            console.log("failed to upload");
            res.json({message:"Something went wrong in the upload :(",type:"error",success:false})
        }
    });
}

exports.changeProfilePic = (req,res) =>{
    const { userID } = req.body;
    User.findOne({_id: userID},(err,user)=>{
        if(err) throw err;
        if(user != null){
            //remove old data
            const oldImage = user.profilePic.public_id;
            if(parseInt(oldImage) != 0){
                //not using default image so destroy old image from CDN
                cloudinary.uploader.destroy(oldImage, function(error, result) { console.log(error,result); });
            }
            //change to new data
            const newPic = req.body.newProfilePicURL;
            user.profilePic = {url:newPic,public_id:req.body.publicID};
            user.save();
            res.json({message:"Picture Uploaded!",type:"success",success:true,image:newPic});
            req.session.user.profilePic = newPic;
        }
    })
}