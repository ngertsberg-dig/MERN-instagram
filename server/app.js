const express = require("express");
const app = require("express")();
const session = require("express-session");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const PORT = process.env.port || 8080;

const User = require("./models/usersModels");

const UserRoutes = require("./routes/userRoutes");

mongoose.connect('mongodb://nickey22:gunit2@ds259878.mlab.com:59878/user-login',
    {useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=>console.log("connected to mongoose"))
    .catch(error=>handleError(error));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(session({secret:"dsf7nh329n"}));
app.use("/api/user/",UserRoutes);



app.get("/",(req,res)=>{
    res.send("hello e");
})
app.listen(PORT,function(){
    console.log(`listening on port ${PORT}`);
})