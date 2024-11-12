const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotioncontroller');

// Promotion CRUD
router.post('/promotions', promotionController.createPromotion);
router.get('/promotions', promotionController.getPromotions);
router.put('/promotions/:promotionId', promotionController.updatePromotion);
router.delete('/promotions/:promotionId', promotionController.deletePromotion);

// Sales impact tracking
router.get('/promotions/impact', promotionController.getPromotionImpact);

module.exports = router;