const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/signup").post(userController.signUpUser,userController.saveUserIntoDB);

router.route("/login").post(userController.loginValidation);

router.route("/checkIfLogged").get(userController.checkIfLogged);

router.route("/logout").get(userController.logout);

router.route("/addFollowing").post(userController.addFollowing);

router.route("/removeFollowing").post(userController.removeFollowing);

router.route("/getAllUserFollowing").post(userController.getAllUserFollowing);

router.route("/uploadImage").post(userController.uploadProfileImage,userController.changeProfilePic);

module.exports = router;