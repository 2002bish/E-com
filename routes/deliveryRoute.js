const express = require ('express');
const router = 'express.Router';
const deliverycontroller =require ("../controllers/deliverycontroller");

//Assign Delivery Task
router.put('/delivery/assign', deliverycontroller.assignDelivery);

//For real time location tracking
router.put('/delivery/location', deliverycontroller.updateDeliveryLocation);



//If Delivery is completed
router.put('/delivery/complete', deliverycontroller.completeDelivery);

//History of the Delivery
router.get('/delivery/history/:deliveryPersonId', deliverycontroller.getDeliveryHistory)

module.exports =router;
