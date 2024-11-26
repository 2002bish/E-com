
const express = require('express');
const router = express.Router();
const refundController = require('../controllers/refundcontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")

// Refunds and cancellations
router.post("/refund", refundController.processRefund);
router.post("/cancel", refundController.cancelOrder);

module.exports = router;