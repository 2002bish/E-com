const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  saleDate: { type: Date, default: Date.now }
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
