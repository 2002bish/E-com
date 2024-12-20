const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  productId: {
    type: String,
    required: true,
    unique: true,  // Ensure productId is unique
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` before saving
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
