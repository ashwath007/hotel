const express = require("express");
const router = express.Router();
const { addFleets, allFleets, fleetSignin, editFleets, editsaveFleets, assignOrderToBoy, deletesaveFleets, pushOrder } = require("../controllers/fleets") //backend\controllers\fleets.js
    //ADmin
router.post("/fleets/addfleets", addFleets)

router.get("/fleets/allfleets", allFleets)
    //Delivery boy
router.post("/fleets/signuptowork", fleetSignin)
router.get("/fleets/loadeditfleets/:fleetsId", editFleets)
router.post("/fleets/editfleetsave", editsaveFleets)
router.delete("/fleets/deletefleetsave/:fid", deletesaveFleets)

router.post("/fleets/assign/order/:orderId/fleets/:fleetId", assignOrderToBoy)
router.get("/admin/shaji/dashboard/orders/loadorderanduser/assign/ordertofleets/:orderId/fleet/:fleetId", pushOrder)


module.exports = router;