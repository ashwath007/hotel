const User = require("../models/user");
require("dotenv").config();

const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const Nexmo = require('nexmo');
var expressJwt = require("express-jwt");
const uuidv1 = require("uuid/v1");

const NEXMO_API_KEY = "75b67bbb"
const NEXMO_API_SECRET = "F4HkJcuLjJRIsBwW"
const TO_NUMBER = "+918072002769"
const NEXMO_BRAND_NAME = 'LOCAL APP '
const nexmo = new Nexmo({
    apiKey: NEXMO_API_KEY,
    apiSecret: NEXMO_API_SECRET
})



exports.signup = (req, res) => {
    console.log(">>>", req.body);
    // const errors = validationResult(req);
    const CODE = uuidv1().substr(1, 4);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         error: errors.array()[0].msg
    //     });
    // }
    // User.findOne({phone:req.body.phone},(err,found)=>{
    //     if(err){
    //         return res.status(400).josn({
    //             error:err
    //         })
    //     }
    //     else{

    //     }
    // })
    const user = new User(req.body);
    user.save((err, user) => {

        //     if (!errors.isEmpty()) {
        //     return res.status(422).json({
        //         error: errors.array()[0].msg
        //     });
        // }
        if (err) {
            console.log("ERROR : ", err);

            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }
        user.code = CODE;
        user.save((err, saved) => {
            if (err) {
                console.log("ERROR : ", err);

                return res.status(400).json({
                    err: "NOT able to save user in DB"
                });
            }
            const from = "LOCAL APP"
            const to = "+91" + saved.phone
            const text = NEXMO_BRAND_NAME + CODE
            console.log("USER : ", user);
            nexmo.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if (responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                        res.json({
                            name: user.name,
                            phone: user.phone,
                            id: user._id,
                            code: user.code
                        });
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            })


        })

    });
};

exports.signin = (req, res) => {
    console.log("Hit");
    console.log(req.body);
    const PHONE = "+91" + req.body.phone;
    User.findOne({ phone: req.body.phone }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User phone does not exists, please signup"
                });
            }
            if (err) {
                console.log("ERROR", err);

                return res.status(400).json({
                    error: err
                })

            } else {
                console.log("USER : ", user);
                if (user != null) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
                    res.cookie("token", token, { expire: new Date() + 99999 });
                    const { _id, name, phone, role } = user;
                    return res.json({ token, user: { _id, name, phone, role } });
                } else {
                    return 0
                }


            }
        })
        // const errors = validationResult(req);
        // const { email, password } = req.body;

    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         error: errors.array()[0].msg
    //     });
    // }

    // User.findOne({ email }, (err, user) => {
    //     if (err || !user) {
    //         return res.status(400).json({
    //             error: "USER email does not exists"
    //         });
    //     }

    //     if (!user.autheticate(password)) {
    //         return res.status(401).json({
    //             error: "Email and password do not match"
    //         });
    //     }

    //create token
    // const token = jwt.sign({ _id: "user._id" }, "hooo");
    //put token in cookie
    // res.cookie("token", token, { expire: new Date() + 9999 });

    // send response to front end
    // const { _id } = user;
    // return res.json({ token, user: "vicky" });
    // });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
        });
    }
    next();
};


exports.admincode = (req, res) => {
    console.log("YEs");
    console.log(req.body);
    if (req.body.passcode === "8072002769") {
        console.log("God");
        const token = jwt.sign({ name: "admin" }, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        // send response to front end
        return res.json({ token, user: "admin", role: 1 });
    }
}