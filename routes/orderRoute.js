const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');

// Order routes
router.post("/create", orderController.createOrder); 
router.get("/get", orderController.getAllOrders); 
router.get("/getbyid", orderController.getOrderById); 

// Order management
router.put("/update", orderController.updateOrderStatus); 
router.put("/assign", orderController.assignOrderToDeliveryPerson); 
router.put("/refund", orderController.handleRefund); 

module.exports = router;
