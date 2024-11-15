const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationcontroller');

// Order Notification
router.post('/notifications/order', notificationController.sendOrderNotification);

// Inventory Alert
router.post('/notifications/inventory', notificationController.sendInventoryAlert);

// Customer Notification
router.post('/notifications/customer', notificationController.sendCustomerNotification);

// Mark Notification as Read
router.patch('/notifications/:notificationId/read', notificationController.markAsRead);

module.exports = router;
