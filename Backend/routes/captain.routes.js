const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const { body } = require("express-validator");
const { authCaptain } = require("../middlewares/auth.middleware");

router.post("/register",
    // (req) => {console.log(req.body)},
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    captainController.registerCaptain
);

router.post("/login", 
    body("email").isEmail().withMessage("Invalid Email"),
    captainController.loginCaptain
);

router.patch("/update", authCaptain, captainController.updateCaptainProfile);

router.get("/profile", authCaptain, captainController.captainProfile);

router.get("/logout", authCaptain, captainController.logoutCaptain);

module.exports = router;
