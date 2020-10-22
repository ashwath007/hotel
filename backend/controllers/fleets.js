var random = require('randomize');

const Fleets = require("../models/fleets");
const Orders = require("../models/uorder");
const User = require("../models/user");
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

exports.getFleetsOrders = (req, res) => {
    const NETORDER = [];
    const orders = [];
    const status = [];
    const sendProduct = [];
    const sendPrice = [];
    const sendQty = [];
    const TOTAL = [];
    const finalsendPrice = [];
    const paymentType = [];


    const finalsendProduct = [];
    const finalsendQty = [];
    console.log(req.params.id)
    order_list = []
    Fleets.findById(req.params.id, (err, T) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(T)
        User.
        T.orders.map((P, I) => {
            Orders.findById(P, (err, gota) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })

                }
                console.log(gota);
                TOTAL.push(gota.total)
                console.log("_ID", gota._id);
                paymentType.push(gota.paymentype)

                console.log(gota.productname[0].length);
                gota.productname[0].map((c, i) => {
                        console.log("c", c + " ");
                        console.log("c", gota.orderstatus);

                        status.push(gota.orderstatus)
                        sendProduct.push(c)
                        sendPrice.push(gota.productprice[0][i])
                        sendQty.push(gota.productqty[0][i])


                    })
                    //1.get all the orders and frame them correctly
                console.log(sendProduct);
                console.log(sendPrice);
                console.log(TOTAL);
                console.log(sendQty);
                console.log(paymentType);







            })
        })
        return res.json({
            Pname: finalsendProduct,
            Status: status,
            Pprice: finalsendPrice,
            Pqty: finalsendQty,
            Ptotal: TOTAL
        })
    })
}

exports.getalluserorders = (req, res) => {
    const NETORDER = [];
    const orders = [];
    const status = [];
    const sendProduct = [];
    const sendPrice = [];
    const sendQty = [];
    const TOTAL = [];
    const finalsendPrice = [];

    const finalsendProduct = [];
    const finalsendQty = [];


    console.log("USER ID : ", req.params.userId);
    uorder.find({ userid: req.params.userId }, (err, gota) => {
        if (err) {
            return res.status(400).json({
                error: err
            })

        }
        console.log(gota);

        console.log(gota.length);
        gota.map((c, i) => {
                console.log("c", c.productname + " ");
                console.log("c", c.orderstatus);
                console.log("_ID", c._id);

                status.push(c.orderstatus + " ")
                sendProduct.push(c.productname)
                sendPrice.push(c.productprice)
                sendQty.push(c.productqty)
                TOTAL.push(c.total)


            })
            //1.get all the orders and frame them correctly
        console.log(sendProduct);
        sendProduct.map((CC, II) => {
            console.log(CC[0]);
            finalsendProduct.push(CC[0] + " ")
        })
        sendPrice.map((CC, II) => {
            console.log(CC[0]);
            finalsendPrice.push(CC[0] + " ")
        })
        sendQty.map((CC, II) => {
            console.log(CC[0]);
            finalsendQty.push(CC[0] + " ")
        })
        console.log(finalsendProduct);
        console.log("TOTAL PRICES : >>> ", TOTAL);

        return res.json({
            Pname: finalsendProduct,
            Status: status,
            Pprice: finalsendPrice,
            Pqty: finalsendQty,
            Ptotal: TOTAL
        })
    })


}