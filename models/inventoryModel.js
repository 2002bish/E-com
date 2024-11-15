const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  category: { type: String, required: true },
  stockLevel: { type: Number, required: true },
  lastRestocked: { type: Date, default: Date.now },
  lowStockAlert: { type: Boolean, default: false } // New field
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
