const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingcontroller');

// Operational Settings
router.get("/settingoperational", settingsController.getOperationalSettings);
router.put("/update-setting-operational", settingsController.updateOperationalSettings);

// Payment Settings
router.get("/settingpayment", settingsController.getPaymentSettings);
router.put("/update-setting-payment", settingsController.updatePaymentSettings);

// Tax Settings
router.get("/setting-tax", settingsController.getTaxSettings);
router.put("/update-setting-tax", settingsController.updateTaxSettings);

module.exports = router;
