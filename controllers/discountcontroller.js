const DiscountCode = require('../models/discountModel');

// Create a new discount code
exports.createDiscountCode = async (req, res) => {
  try {
    const { code, discountType, value, minOrderValue, maxDiscount, expiresAt } = req.body;
    const discountCode = new DiscountCode({ code, discountType, value, minOrderValue, maxDiscount, expiresAt });
    await discountCode.save();
    res.status(201).json({ message: 'Discount code created successfully', discountCode });
  } catch (error) {
    res.status(400).json({ error: 'Error creating discount code', details: error });
  }
};

// Get all active discount codes
exports.getDiscountCodes = async (req, res) => {
  try {
    const discountCodes = await DiscountCode.find({ isActive: true });
    res.status(200).json({ discountCodes });
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving discount codes', details: error });
  }
};

// Update a discount code
exports.updateDiscountCode = async (req, res) => {
  try {
    const discountCodeId = req.params.discountCodeId;
    const updatedDiscountCode = await DiscountCode.findByIdAndUpdate(discountCodeId, req.body, { new: true });
    res.status(200).json({ message: 'Discount code updated', updatedDiscountCode });
  } catch (error) {
    res.status(400).json({ error: 'Error updating discount code', details: error });
  }
};

// Delete a discount code
exports.deleteDiscountCode = async (req, res) => {
  try {
    const discountCodeId = req.params.discountCodeId;
    await DiscountCode.findByIdAndDelete(discountCodeId);
    res.status(200).json({ message: 'Discount code deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting discount code', details: error });
  }
};




