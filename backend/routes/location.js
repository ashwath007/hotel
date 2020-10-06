const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
    getOrderById,
    createOrder,
    getAllOrders,
    getAllOrdersToday,
    getOrderStatus,
    getUserDataOder,
    updateStatus,
    getalluserorders
} = require("../controllers/order");
const { saveUserLoc, alldataUser } = require("../controllers/location");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);
router.post("/loc/user/save/address", saveUserLoc);
router.post("/user/alldatas/all", alldataUser);

///loc/user/${USER_ID}/loc/lat/${lat}/long/${long}/save/address/${USER_ADD}
module.exports = router;