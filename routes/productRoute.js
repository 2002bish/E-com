const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');


router.post('/products', productController.createProduct); 
router.get('/products', productController.getProducts); 
router.get('/products/:id', productController.getProductById); 
router.put('/products/:id', productController.updateProduct); 
router.delete('/products/:id', productController.deleteProduct); 


router.put('/products/:id/stock', productController.updateStock); 


router.post('/products/import', productController.importProducts); // Import products
router.get('/products/export', productController.exportProducts); // Export products to CSV

module.exports = router;
