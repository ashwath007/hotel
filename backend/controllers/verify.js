const User = require("../models/user");
require("dotenv").config();
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
exports.smsVerify = (req, res) => {
    console.log("YEs yes");
    console.log(req.body);
    User.findById(req.body.UID).exec((err, gotUser) => {
        if (err) {
            return res.status(400).json({
                error: "Can't find you , please login"
            })

        } else {
            console.log(gotUser);
            console.log(gotUser.code);
            if (gotUser.code === req.body.code) {
                console.log("Yes User have entered the correct number");
                gotUser.verifyed = true;
                gotUser.save((err, verifyed) => {
                    if (err) {

                        console.log(err);
                    } else {
                        console.log(verifyed);
                        const token = jwt.sign({ _id: gotUser._id }, process.env.SECRET);
                        res.cookie("token", token, { expire: new Date() + 99999 });
                        const { _id, name, phone, role } = gotUser;
                        return res.json({ token, user: { _id, name, phone, role } });

                    }
                })


            }
        }
    })
}