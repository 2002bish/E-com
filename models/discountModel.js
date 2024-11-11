const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true },  
  minOrderValue: { type: Number, default: 0 },  
  maxDiscount: { type: Number },  
  expiresAt: { type: Date, required: true },
  usageCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
});

const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema);

module.exports = DiscountCode;
