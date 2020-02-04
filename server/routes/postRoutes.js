const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.route("/createPost").post(postController.createPost);

router.route("/getfollowingposts").post(postController.getUserListPosts);

module.exports = router;