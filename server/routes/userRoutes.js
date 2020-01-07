const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/signup").post(userController.signUpUser,userController.saveUserIntoDB);

router.route("/login").post(userController.loginValidation);

router.route("/checkIfLogged").get(userController.checkIfLogged);

router.route("/logout").get(userController.logout);

module.exports = router;