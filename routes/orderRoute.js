const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');

// Order routes
router.post('/orders', orderController.createOrder); 
router.get('/orders', orderController.getAllOrders); 
router.get('/orders/:id', orderController.getOrderById); 

// Order management
router.put('/orders/:id/status', orderController.updateOrderStatus); 
router.put('/orders/:id/assign', orderController.assignOrderToDeliveryPerson); 
router.put('/orders/:id/refund', orderController.handleRefund); 

module.exports = router;
