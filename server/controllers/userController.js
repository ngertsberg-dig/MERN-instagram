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
