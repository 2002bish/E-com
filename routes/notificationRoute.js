const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationcontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")

// Order Notification
router.post("/Ordernotification", notificationController.sendOrderNotification);

// Inventory Alert
router.post("/inventory", notificationController.sendInventoryAlert);

// Customer Notification
router.post("/customer", notificationController.sendCustomerNotification);

// Mark Notification as Read
router.patch("/markasread", notificationController.markAsRead);

module.exports = router;
