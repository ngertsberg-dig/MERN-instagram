const User = require("../models/usersModels");
const jwt = require("jsonwebtoken");
const secret = 'mysecretshhhh';
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