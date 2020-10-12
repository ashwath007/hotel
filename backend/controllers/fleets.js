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
                err: err
            })
        }
        if (Yes != null) {
            console.log(Yes)
            if (Yes.fid === req.body.code) {
                console.log("Yes correct code")
                return res.json({
                    done: Yes
                })
            } else {
                return res.status(400).json({
                    err: "Please ask the admin for the code "
                })
            }
        }
        if (Yes === null) {
            return res.status(400).json({
                err: "You are not a valid user, please ask the admin"
            })
        }
    })
}


exports.editFleets = (req, res) => {
    console.log("WEFW")
    console.log(req.params.fleetsId);
    Fleets.findById(req.params.fleetsId, (err, Done) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(Done);
        return res.json(Done)
    })
}

exports.editsaveFleets = (req, res) => {
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.phone);
    console.log(req.body.code);
    Fleets.findById(req.body.fleetId, (err, toto) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(toto)
        toto.name = req.body.name
        toto.phone = req.body.phone
        toto.fid = req.body.code
        toto.save((err, tt) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            console.log(tt)
            return res.json(tt)
        })

    })
}


exports.assignOrderToBoy = (req, res) => {

}


exports.deletesaveFleets = (req, res) => {
    console.log(req.params.fid)
    Fleets.findByIdAndDelete(req.params.fid, (err, doene) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(doene)
        return res.json(doene)
    })

}


exports.pushOrder = (req, res) => {
    console.log(req.params.orderId)

    console.log(req.params.fleetId)
    Fleets.findById(req.params.fleetId, (err, done) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(done)
        done.orders.push(req.params.orderId);
        done.save((err, tt) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            console.log(tt)
            return res.json(tt)
        })
    })
}