const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotioncontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")

// Promotion CRUD
router.post("/createpromotion", promotionController.createPromotion);
router.get("/getpromotion", promotionController.getPromotions);
router.put("/updatepromotion", promotionController.updatePromotion);
router.delete("/deletepromotion", promotionController.deletePromotion);

// Sales impact tracking
router.get("/promotionimpact", promotionController.getPromotionImpact);

module.exports = router;