const express = require('express');
const router = express.Router();
const discountCodeController = require('../controllers/discountcontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")

// Discount code CRUD
router.post("/creatediscountcodes", discountCodeController.createDiscountCode);
router.get("/getdiscountcodes", discountCodeController.getDiscountCodes);
router.put("/updatediscountcodes", discountCodeController.updateDiscountCode);
router.delete("/deletediscountcodes", discountCodeController.deleteDiscountCode);

module.exports = router;
