var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn, admincode } = require("../controllers/auth");
const { smsVerify } = require("../controllers/verify");
router.post(
    "/signup", [
        // check("name", "name should be at least 3 char").isLength({ min: 3 }),
        // check("phone", "phone should be at least 10").isLength({ min: 10 })
    ],
    signup
);

router.post(
    "/signin", [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
);
router.post(
    "/admin/signinpass",
    admincode
);
router.post(
    "/user/verify/sms",
    smsVerify
)
router.get("/signout", signout);

module.exports = router;