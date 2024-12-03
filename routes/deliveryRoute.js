const express = require ('express');
const router = express.Router();
const deliverycontroller =require ("../controllers/deliverycontroller");
const {authMiddleware}= require ("../middlewares/authMiddleware")

//Assign Delivery Task
router.put("/assign", deliverycontroller.assignDelivery);

//For real time location tracking
router.put("/location", deliverycontroller.updateDeliveryLocation);

//If Delivery is completed
router.put("/complete", deliverycontroller.completeDelivery);

//History of the Delivery
router.get("/history/:deliveryPersonId", deliverycontroller.getDeliveryHistory);

module.exports =router;
