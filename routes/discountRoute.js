const express = require('express');
const router = express.Router();
const discountCodeController = require('../controllers/discountcontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")

// Discount code CRUD
router.post("/create", discountCodeController.createDiscountCode);
router.get("/get", discountCodeController.getDiscountCodes);
router.put("/:discoundCodeId", discountCodeController.updateDiscountCode);
router.delete("/:discountCodeId", discountCodeController.deleteDiscountCode);

module.exports = router;
