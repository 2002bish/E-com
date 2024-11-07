const Product = require('../models/productModel');

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error: 'Error creating product', details: error });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching products', details: error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching product', details: error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: 'Error updating product', details: error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting product', details: error });
  }
};

// Update stock level and check  low stock alert
exports.updateStock = async (req, res) => {
  const { stockChange } = req.body; 
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.stock += stockChange;

    // Low stock alert
    if (product.stock <= 10) {
      return res.status(200).json({ 
        message: `Warning: Low stock for ${product.name}`, 
        product 
      });
    }

    await product.save();
    res.status(200).json({ message: 'Stock updated successfully', product });
  } catch (error) {
    res.status(400).json({ error: 'Error updating stock', details: error });
  }
};

// Batch import products
exports.importProducts = async (req, res) => {
  try {
    const products = req.body.products; // Expecting an array of product objects
    await Product.insertMany(products);
    res.status(201).json({ message: 'Products imported successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error importing products', details: error });
  }
};

// Export products to CSV
const { parse } = require('json2csv');
exports.exportProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const csv = parse(products);
    res.header('Content-Type', 'text/csv');
    res.attachment('products.csv');
    res.send(csv);
  } catch (error) {
    res.status(400).json({ error: 'Error exporting products', details: error });
  }
};
