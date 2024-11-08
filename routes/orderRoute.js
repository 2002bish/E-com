const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');

// Order routes
router.post('/orders', orderController.createOrder); // Create order
router.get('/orders', orderController.getAllOrders); // Get all orders
router.get('/orders/:id', orderController.getOrderById); // Get order by ID

// Order management
router.put('/orders/:id/status', orderController.updateOrderStatus); // Update order status
router.put('/orders/:id/assign', orderController.assignOrderToDeliveryPerson); // Assign to delivery person
router.put('/orders/:id/refund', orderController.handleRefund); // Manage refunds

module.exports = router;
