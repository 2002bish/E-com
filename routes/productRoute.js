const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');

// Product routes
router.post('/products', productController.createProduct); // Create product
router.get('/products', productController.getProducts); // Get all products
router.get('/products/:id', productController.getProductById); // Get product by ID
router.put('/products/:id', productController.updateProduct); // Update product
router.delete('/products/:id', productController.deleteProduct); // Delete product

// Inventory management
router.put('/products/:id/stock', productController.updateStock); // Update stock and low stock alerts

// Batch import/export
router.post('/products/import', productController.importProducts); // Import products
router.get('/products/export', productController.exportProducts); // Export products to CSV

module.exports = router;
