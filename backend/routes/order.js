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
    alluserorderdata,
    nowDelivery,
    holdOrder,
    rejectOrder,
    nowDelivered,
    updateStatus,
    nowDone,
    nowCooking,
    getalluserorders
} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual routes
//create
router.post(
    "/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    // pushOrderInPurchaseList,
    // updateStock,
    createOrder
);
//read
router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
);

//status of order
router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);
router.put(
    "/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);
//shaji
router.get(
    "/order/get/allusers/:userId",
    isSignedIn,
    isAuthenticated,
    getalluserorders
);
router.get(
    "/order/admin/allusers",
    // isSignedIn,
    // isAuthenticated,
    getAllOrdersToday
);
router.get(
    "/order/admin/userdata/order/:orderId",
    // isSignedIn,
    // isAuthenticated,
    getUserDataOder
);
router.get("/admin/shaji/dashboard/orders/holdorders/:orderId", holdOrder)
router.get("/admin/shaji/dashboard/orders/rejectOrder/:orderId", rejectOrder)


router.post("/admin/nowcooking", nowCooking);
router.post("/admin/nowDone", nowDone);
router.post("/admin/nowDelivery", nowDelivery);
router.post("/admin/nowDelivered", nowDelivered);

router.get("/admin/shaji/dashboard/orders/loadorderanduser/assign/:orderId", alluserorderdata)


module.exports = router;