const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');

// Order routes
router.post("/create", orderController.createOrder); 
router.get("/get", orderController.getAllOrders); 
router.get("/:id", orderController.getOrderById); 

// Order management
router.put("/:id/status", orderController.updateOrderStatus); 
router.put("/:id/assign", orderController.assignOrderToDeliveryPerson); 
router.put("/:id/refund", orderController.handleRefund); 

module.exports = router;
