const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")


router.post("/create", productController.createProduct); 
router.get("/get", productController.getProducts); 
router.get("/:id", productController.getProductById); 
router.put("/:id", productController.updateProduct); 
router.delete("/:id", productController.deleteProduct); 


router.put("/:id/stock", productController.updateStock); 


router.post("/import", productController.importProducts); // Import products
router.get("/export", productController.exportProducts); // Export products to CSV

module.exports = router;
