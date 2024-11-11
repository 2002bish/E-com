const Promotion = require('../models/promotionModel');
const Order = require('../models/orderModel');

// Create a new promotion
exports.createPromotion = async (req, res) => {
  try {
    const { title, description, discountType, discountValue, startDate, endDate, conditions } = req.body;
    const promotion = new Promotion({ title, description, discountType, discountValue, startDate, endDate, conditions });
    await promotion.save();
    res.status(201).json({ message: 'Promotion created successfully', promotion });
  } catch (error) {
    res.status(400).json({ error: 'Error creating promotion', details: error });
  }
};

// Get all active promotions
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find({ isActive: true });
    res.status(200).json({ promotions });
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving promotions', details: error });
  }
};

// Update a promotion
exports.updatePromotion = async (req, res) => {
  try {
    const promotionId = req.params.promotionId;
    const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, req.body, { new: true });
    res.status(200).json({ message: 'Promotion updated', updatedPromotion });
  } catch (error) {
    res.status(400).json({ error: 'Error updating promotion', details: error });
  }
};

// Delete a promotion
exports.deletePromotion = async (req, res) => {
  try {
    const promotionId = req.params.promotionId;
    await Promotion.findByIdAndDelete(promotionId);
    res.status(200).json({ message: 'Promotion deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting promotion', details: error });
  }
};

// Track sales impact of promotions
exports.getPromotionImpact = async (req, res) => {
  try {
    const promotions = await Promotion.find({ isActive: true });
    const salesImpact = await Promise.all(
      promotions.map(async (promotion) => {
        const orderCount = await Order.countDocuments({ promotionId: promotion._id });
        return { promotion: promotion.title, orderCount };
      })
    );
    res.status(200).json({ salesImpact });
  } catch (error) {
    res.status(400).json({ error: 'Error calculating sales impact', details: error });
  }
};
