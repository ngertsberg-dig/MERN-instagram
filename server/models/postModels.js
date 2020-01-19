const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postTitle: String,
    postContent: String,
    postImage: String,
    numOfLikes: { type: Number, default: 0},
    likeIDS: Array,
    dateCreated: Date
});

module.exports =  mongoose.model("Post",postSchema);