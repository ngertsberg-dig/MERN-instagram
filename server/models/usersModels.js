const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    following: Array,
    profilePic: {}
});

module.exports = mongoose.model("User",userSchema);