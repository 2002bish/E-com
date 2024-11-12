const express = require('express');
const router = express.Router();
const discountCodeController = require('../controllers/discountCodeController');

// Discount code CRUD
router.post('/discount-codes', discountCodeController.createDiscountCode);
router.get('/discount-codes', discountCodeController.getDiscountCodes);
router.put('/discount-codes/:discountCodeId', discountCodeController.updateDiscountCode);
router.delete('/discount-codes/:discountCodeId', discountCodeController.deleteDiscountCode);

module.exports = router;
