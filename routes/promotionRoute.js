const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotioncontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")

// Promotion CRUD
router.post("/create", promotionController.createPromotion);
router.get("/get", promotionController.getPromotions);
router.put("/:promotionID", promotionController.updatePromotion);
router.delete("/:promotionID", promotionController.deletePromotion);

// Sales impact tracking
router.get("/impact", promotionController.getPromotionImpact);

module.exports = router;