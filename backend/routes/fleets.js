const express = require("express");
const router = express.Router();
const { addFleets, allFleets, fleetSignin } = require("../controllers/fleets") //backend\controllers\fleets.js
    //ADmin
router.post("/fleets/addfleets", addFleets)

router.get("/fleets/allfleets", allFleets)
    //Delivery boy
router.post("/fleets/signuptowork", fleetSignin)
module.exports = router;