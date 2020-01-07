const express = require("express");
const app = require("express")();
const session = require("express-session");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const cookieParser = require("cookie-parser");
const PORT = process.env.port || 8080;

const UserRoutes = require("./routes/userRoutes");

mongoose.connect('mongodb://nickey22:gunit2@ds259878.mlab.com:59878/user-login',
    {useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=>console.log("connected to mongoose"))
    .catch(error=>handleError(error));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret:"shhh",
    key:"user_sid",
    resave:false,
    saveUninitialized: false,
    cookie:{
        expires: 60000 * 60
    }
}));

app.use("/api/user/",UserRoutes);



app.get("/",(req,res)=>{
    res.send("hello e");
})
app.listen(PORT,function(){
    console.log(`listening on port ${PORT}`);
})