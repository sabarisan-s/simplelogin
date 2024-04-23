const express = require("express");
const router = express.Router();
const {
    test,
    registerUser,
    loginUser,
    getProfileUser,
} = require("../controllers/authController");

const cors = require("cors");

//middleware
router.use(cors());

router.route("/").get(test);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(getProfileUser);

module.exports = router;
