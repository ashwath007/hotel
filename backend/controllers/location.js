const user = require("../models/user");

exports.saveUserLoc = (req, res) => {


    console.log(req.body);
    console.log(req.body.userId);

    user.findById(req.body.userId, (err, gota) => {
        if (err) {
            return res.status(400).json({
                error: "can't find you"
            })
        }
        console.log(gota);
        gota.address = req.body.ulocation
        gota.location.coordinates.push(req.body.latitude, req.body.longitude);
        gota.save((err, done) => {
            if (err) {
                return res.status(400).json({
                    error: "can't find you"
                })
            }
            console.log(done);
            return res.json({
                msg: "Saved address and coordinates"
            })
        })
    })


}


exports.alldataUser = (req, res) => {
    console.log(req.body);
    user.findById(req.body.userids, (err, gota) => {
        if (err) {
            return res.status(400).json({
                error: "can't find you"
            })
        }
        console.log(gota);
        console.log(gota.location.coordinates);
        console.log(gota.address);
        return res.json({
            address: gota.address,
            coord: gota.location.coordinates
        })


    })

}