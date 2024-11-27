const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingcontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")

// Operational Settings
router.get("/operational", settingsController.getOperationalSettings);
router.put("/operational", settingsController.updateOperationalSettings);

// Payment Settings
router.get("/payment", settingsController.getPaymentSettings);
router.put("/payment", settingsController.updatePaymentSettings);

// Tax Settings
router.get("/tax", settingsController.getTaxSettings);
router.put("/tax", settingsController.updateTaxSettings);

module.exports = router;
