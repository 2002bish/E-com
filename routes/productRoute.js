const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")


router.post("/create", productController.createProduct); 
router.get("/get", productController.getProducts); 
router.get("/productid", productController.getProductById); 
router.put("/updateproductid", productController.updateProduct); 
router.delete("/deleteproductid", productController.deleteProduct); 


router.put("/updateproductstock", productController.updateStock); 


router.post("/productimport", productController.importProducts); // Import products
router.get("/productsexport", productController.exportProducts); // Export products to CSV

module.exports = router;
