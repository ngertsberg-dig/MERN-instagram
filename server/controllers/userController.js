const User = require("../models/usersModels");

exports.signUpUser = (req,res,next) =>{
    const { name } = req.body.FormValues;
    User.findOne({ name }, (err, user) =>{
        if(err) throw err;
        if(user != null){
            res.status(401); 
            res.json("Username is taken");
        }
        else{
            next();
        }
    });
}

exports.saveUserIntoDB = (req,res) => {
    const { name, email, password } = req.body.FormValues;
    const newUser = new User({name,email,password});
    newUser.save().then(()=>{
        res.status(200);
        res.json("User created successfully")
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
            res.json({user, message:"Succesfully logged in.",type:"success"});
        }
    })
}

exports.checkIfLogged = (req,res) =>{


    if(req.session.user == undefined){
        res.json({message:"No user logged",success:false});
    }
    else{
        res.json({user: req.session.user , message:"Signed in user!",success:true});
    }
    
}

exports.logout = (req,res) =>{
    req.session.user = undefined;
    res.json({message:"Successfully logged out",success:true,type:"success"});
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
                res.json({message:"User Followed!",type:"success"});
            }
            else{
                res.json({message:"Already following User!",type:"error"})
            }
        }
        else{
            res.json({message:"Failed to find current user!",type:"error"})
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
                res.json({message:"User unfollowed!",type:"success"});
            }
            else{
                res.json({message:"Not following User!",type:"error"})
            }
        }
        else{
            res.json({message:"Failed to find current user!",type:"error"})
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