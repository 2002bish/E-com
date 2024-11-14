const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportcontroller');

// Sales Reports
router.get('/reports/sales', reportsController.getSalesReport);

// Inventory Reports
router.get('/reports/inventory', reportsController.getInventoryReport);

// Customer Metrics
router.get('/reports/customer-metrics', reportsController.getCustomerMetrics);

// Delivery Performance
router.get('/reports/delivery-performance', reportsController.getDeliveryPerformanceReport);

module.exports = router;
