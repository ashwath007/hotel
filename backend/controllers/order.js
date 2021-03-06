const order = require("../models/order");
const { Order, ProductCart } = require("../models/order");
// const { UOrder } = require("../models/uorder");
const uorder = require("../models/uorder");
const user = require("../models/user");
const fleets = require("../models/fleets");
exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "NO order found in DB"
                });
            }
            req.order = order;
            next();
        });
};

exports.createOrder = (req, res) => {
    console.log(req.body);
    const UORDER = new uorder();
    user.findById(req.body.userId._id).exec((err, gotUser) => {
        if (err) {
            return res.status(400).json({
                error: "Could't find the user"
            })

        }
        console.log("got User  : ", gotUser);
        gotUser.loc = "User Exist";

        gotUser.save((err, locSaved) => {
            if (err) {
                return res.status(400).json({
                    error: "Can't save location"
                })
            }
            console.log(locSaved);
            UORDER.productname.push(req.body.PRODUCTS);
            UORDER.productqty.push(req.body.names);
            UORDER.productprice.push(req.body.price);
            UORDER.orderstatus = "Ordered"
            UORDER.orderId = req.body.id;
            UORDER.userid = locSaved._id;
            UORDER.total = req.body.totalPrice;
            UORDER.paymentype = "COD"
            UORDER.save((error, fo) => {
                if (error) {
                    console.log(error);
                } else if (fo) {
                    console.log(fo);
                    locSaved.order.push(fo._id);
                    locSaved.save((err, kook) => {
                        if (err) {
                            console.log(err);
                        } else if (kook) {
                            console.log(kook);
                            //Here we should redirect the user to order page
                            //and remove all cart and items in the cart 

                            return res.json({
                                done: "Order Placed"
                            })
                        }
                    })
                }
            });
            //
        })
    })
};

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No orders found in DB"
                });
            }
            res.json(order);
        });
};

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "Cannot update order status"
                });
            }
            res.json(order);
        }
    );
};


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


exports.getAllOrdersToday = (req, res) => {
    console.log("Hit All Orders");

    const NETORDER = [];
    const orders = [];
    const status = [];
    const sendProduct = [];
    const sendPrice = [];
    const USER_ID = [];
    const USER_NAME = [];
    const USER_PHONE = [];
    const USER_LOCATION = [];
    const sendQty = [];
    const TOTAL = [];
    const finalsendPrice = [];
    const ORDER_ID = [];


    const finalsendProduct = [];
    const finalsendQty = [];


    uorder.find({}, (err, gota) => {
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
            console.log("c user Id", c.userid);
            console.log("_ID : ", c._id);
            ORDER_ID.push(c._id)
            status.push(c.orderstatus + " ")
            sendProduct.push(c.productname)
            sendPrice.push(c.productprice)
            sendQty.push(c.productqty)

            TOTAL.push(c.total)
            USER_ID.push(c.userid)
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
            console.log(USER_ID);
            console.log(USER_NAME);
            console.log(USER_PHONE);
            console.log(USER_LOCATION);
        })
        USER_ID.map((x, id) => {
                user.findOne({ _id: x }).exec((err, usergots) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                    console.log("User Data : ", usergots);
                    USER_NAME.push(usergots.name);
                    USER_PHONE.push(usergots.phone);
                    USER_LOCATION.push(usergots.location);


                })

            })
            //1.get all the orders and frame them correctly
        console.log(USER_NAME);
        console.log(USER_PHONE);
        console.log(USER_LOCATION);

        return res.json({
            Pname: finalsendProduct,
            Status: status,
            Pprice: finalsendPrice,
            Pqty: finalsendQty,
            Ptotal: TOTAL,
            User_Id: USER_ID,
            User_name: USER_NAME,
            User_phone: USER_PHONE,
            User_loc: USER_LOCATION,
            orderId: ORDER_ID

        })
    })


}


exports.getUserDataOder = (req, res) => {
    console.log("HIIIITT");
    console.log("orderId : ", req.params.orderId);
    // console.log("userId : ", req.params.userId);

    uorder.findOne({ _id: req.params.orderId }, (err, done) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(done);
        user.findOne({ _id: done.userid }, (err, got) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })

            }
            return res.json({
                order: done,
                user: got
            })
        })

    })
}


exports.nowCooking = (req, res) => {
    console.log("nowCooking");
    console.log(req.body);
    uorder.findById(req.body.orderId, (err, cook) => {
        if (err) {
            return res.status(400).json({
                error: err
            })

        }
        console.log(cook);
        cook.orderstatus = "Cooking"
        cook.save((err, cooked) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })

            }
            console.log(cooked);
            return res.json({
                msg: "Cooking"
            })
        });
    })
}


exports.nowDone = (req, res) => {
    console.log("nowDone");

    console.log(req.body);
    uorder.findById(req.body.orderId, (err, cook) => {
        if (err) {
            return res.status(400).json({
                error: err
            })

        }
        console.log(cook);
        cook.orderstatus = "Done Cooking"
        cook.save((err, cooked) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })

            }
            console.log(cooked);
            return res.json({
                msg: "Done Cooking"
            })
        });
    })

}

exports.nowDelivery = (req, res) => {
    console.log("nowDelivery");

    console.log(req.body);
    uorder.findById(req.body.orderId, (err, cook) => {
        if (err) {
            return res.status(400).json({
                error: err
            })

        }
        console.log(cook);
        cook.orderstatus = "Out for Delivery"
        cook.save((err, cooked) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })

            }
            console.log(cooked);
            return res.json({
                msg: "Out for Delivery"
            })
        });
    })
}
exports.nowDelivered = (req, res) => {
    console.log("nowDelivered");

    console.log(req.body);
    uorder.findById(req.body.orderId, (err, cook) => {
        if (err) {
            return res.status(400).json({
                error: err
            })

        }
        console.log(cook);
        cook.orderstatus = "Delivered"
        cook.save((err, cooked) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })

            }
            console.log(cooked);
            return res.json({
                msg: "Out for Delivery"
            })
        });
    })
}
exports.holdOrder = (req, res) => {
    console.log("hoo");

    console.log(req.params.orderId);
    console.log("Hola Hola")
    uorder.findById(req.params.orderId, (err, gots) => {
        if (err) {
            return res.status(400).json({
                error: "Could't find the order"
            })
        }
        console.log(gots)
        gots.orderstatus = "Hold Order";
        gots.save((err, saved) => {
            if (err) {
                return res.status(400).json({
                    error: "Could't find the order"
                })
            }
            console.log(saved)
        })
    })
}

exports.rejectOrder = (req, res) => {
    uorder.findById(req.params.orderId, (err, gots) => {
        if (err) {
            return res.status(400).json({
                error: "Could't find the order"
            })
        }
        console.log(gots)
        gots.orderstatus = "Rejected Order";
        gots.save((err, saved) => {
            if (err) {
                return res.status(400).json({
                    error: "Could't find the order"
                })
            }
            console.log(saved)
        })
    })
}

exports.alluserorderdata = (req, res) => {
    console.log(req.params.orderId)
    uorder.findById(req.params.orderId, (err, done) => {
        if (err) {
            return res.status(400).json({
                error: "Could't find the order"
            })
        }
        console.log(done)
        console.log(done.userid)

        user.findById(done.userid, (err, FF) => {
            if (err) {
                return res.status(400).json({
                    error: "Counl'd find the user"
                })
            }
            console.log(FF)
            fleets.find({}, (err, all) => {
                if (err) {
                    return res.status(400).json({
                        error: "No Delivery boy available"
                    })
                }
                return res.json({
                    order: done,
                    userdata: FF,
                    fleets: all
                })
            })
        })

    })
}