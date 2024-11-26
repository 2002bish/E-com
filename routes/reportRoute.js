const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportcontroller');

// Sales Reports
router.get("/salesreport", reportsController.getSalesReport);

// Inventory Reports
router.get("/reportinventory", reportsController.getInventoryReport);

// Customer Metrics
router.get("/reportscustomer-metrics", reportsController.getCustomerMetrics);

// Delivery Performance
router.get("/reportsdelivery-performance", reportsController.getDeliveryPerformanceReport);

module.exports = router;
