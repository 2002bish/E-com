const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingcontroller');

// Operational Settings
router.get('/settings/operational', settingsController.getOperationalSettings);
router.put('/settings/operational', settingsController.updateOperationalSettings);

// Payment Settings
router.get('/settings/payment', settingsController.getPaymentSettings);
router.put('/settings/payment', settingsController.updatePaymentSettings);

// Tax Settings
router.get('/settings/tax', settingsController.getTaxSettings);
router.put('/settings/tax', settingsController.updateTaxSettings);

module.exports = router;
