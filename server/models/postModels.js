const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postTitle: { type: String, default: "" },
    postContent: { type: String, default: "" },
    postImage: { type: String, default: null },
    postImagePublicId: {type: String, default: null },
    numOfLikes: { type: Number, default: 0 },
    likeIDS: Array,
    dateCreated: Date,
    userID: String,
    userName: String
});

module.exports =  mongoose.model("Post",postSchema);