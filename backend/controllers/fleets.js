var random = require('randomize');

const Fleets = require("../models/fleets");
exports.addFleets = (req, res) => {
    var randomNumber = random(10000);
    console.log(req.body);
    console.log("Fleets Hi");
    const fleet = new Fleets(req.body);
    fleet.save((err, done) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(done)
        done.fid = randomNumber;
        done.save((E, O) => {
            if (E) {
                return res.status(400).json({
                    error: E
                })
            }
            console.log(O)
            return res.json(done)

        })
    })
}

exports.allFleets = (req, res) => {
    Fleets.find().exec((err, allfleets) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(allfleets)
        return res.json(allfleets)

    })
}

exports.fleetSignin = (req, res) => {
    console.log(req.body);
    Fleets.findOne({ phone: req.body.phone }, (err, Yes) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        if (Yes != null) {
            console.log(Yes)
            if (Yes.fid === req.body.code) {
                console.log("Yes correct code")
                return res.json(Yes)
            } else {
                return res.status(400).json({
                    msg: "Please ask the admin for the code "
                })
            }
        }
        if (Yes === null) {
            return res.status(400).json({
                msg: "You are not a valid user, please ask the admin"
            })
        }
    })
}