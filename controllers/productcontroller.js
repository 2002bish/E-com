const Product = require('../models/productModel');
const { parse } = require('json2csv');

// Create a product
exports.createProduct = async (req, res) => {
  try {
    // Generate a custom productId (can be any logic, here I'm using a timestamp)
    const productId = `prod-${Date.now()}`;

    // Create a new product with the generated productId
    const product = new Product({
      productId,  // Set the generated productId
      ...req.body   // Spread the rest of the fields from the request body
    });

    // Save the product
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

// Get a single product by productId
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;  // productId for the product

    // Find product by productId
    const product = await Product.findOne({ productId: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching product', details: error });
  }
};

// Update a product by productId
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;  // productId from the request parameter

    // Find and update the product using the productId
    const product = await Product.findOneAndUpdate(
      { productId: productId },  // Search by productId
      req.body,                   // Update the product with the provided body
      { new: true }               // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: 'Error updating product', details: error });
  }
};

// Delete a product by productId
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;  // productId from the request parameter

    // Find and delete the product using the productId
    const product = await Product.findOneAndDelete({ productId: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting product', details: error });
  }
};

// Update stock level and check low stock alert
exports.updateStock = async (req, res) => {
  const { stockChange } = req.body;
  try {
    const productId = req.params.id;  // productId from the request parameter

    // Find product by productId
    const product = await Product.findOne({ productId: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update stock level
    product.stock += stockChange;

    // Low stock alert
    if (product.stock <= 10) {
      return res.status(200).json({
        message: `Warning: Low stock for ${product.name}`,
        product,
      });
    }

    await product.save();
    res.status(200).json({ message: 'Stock updated successfully', product });
  } catch (error) {
    res.status(400).json({ error: 'Error updating stock', details: error });
  }
};

// Import products
exports.importProducts = async (req, res) => {
  try {
    const products = req.body.products;  // Expecting an array of product objects

    // Add productId for each product
    const productsWithIds = products.map((product) => ({
      productId: `prod-${Date.now()}`,  // Generate a unique productId for each product
      ...product,
    }));

    await Product.insertMany(productsWithIds);
    res.status(201).json({ message: 'Products imported successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error importing products', details: error });
  }
};

// Export products to CSV
exports.exportProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const csv = parse(products);  // Convert products array to CSV
    res.header('Content-Type', 'text/csv');
    res.attachment('products.csv');
    res.send(csv);
  } catch (error) {const Product = require('../models/productModel');
    const { parse } = require('json2csv');
    
    // Create a product
    exports.createProduct = async (req, res) => {
      try {
        // Generate a custom productId (can be any logic, here I'm using a timestamp)
        const productId = `prod-${Date.now()}`;
    
        // Create a new product with the generated productId
        const product = new Product({
          productId,  // Set the generated productId
          ...req.body   // Spread the rest of the fields from the request body
        });
    
        // Save the product
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
    
    // Get a single product by productId
    exports.getProductById = async (req, res) => {
      try {
        const productId = req.params.id;  // productId for the product
    
        // Find product by productId
        const product = await Product.findOne({ productId: productId });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ product });
      } catch (error) {
        res.status(400).json({ error: 'Error fetching product', details: error });
      }
    };
    
    // Update a product by productId
    exports.updateProduct = async (req, res) => {
      try {
        const productId = req.params.id;  // Extract productId from URL params
        console.log('Product ID:', productId);  // Debugging log to check received ID
    
        // Ensure the request body has valid data
        if (!req.body) {
          return res.status(400).json({ error: 'No data provided for update' });
        }
    
        // Find and update the product by productId
        const product = await Product.findOneAndUpdate(
          { productId: productId },  // Search by custom productId
          req.body,                   // Fields to update
          { new: true, runValidators: true }  // Return the updated product and run validators
        );
    
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        // Respond with the updated product
        res.status(200).json({ message: 'Product updated successfully', product });
      } catch (error) {
        console.error('Error updating product:', error);  // Log any error for debugging
        res.status(400).json({ error: 'Error updating product', details: error });
      }
    };
    
    // Delete a product by productId
    exports.deleteProduct = async (req, res) => {
      try {
        const productId = req.params.id;  // Extract productId from URL params
    
        // Find and delete the product by productId
        const product = await Product.findOneAndDelete({ productId: productId });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Error deleting product', details: error });
      }
    };
    
    // Update stock level and check low stock alert
    exports.updateStock = async (req, res) => {
      const { stockChange } = req.body;
      try {
        const productId = req.params.id;  // Extract productId from URL params
    
        // Find product by productId
        const product = await Product.findOne({ productId: productId });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        // Update stock level
        product.stock += stockChange;
    
        // Low stock alert
        if (product.stock <= 10) {
          return res.status(200).json({
            message: `Warning: Low stock for ${product.name}`,
            product,
          });
        }
    
        await product.save();
        res.status(200).json({ message: 'Stock updated successfully', product });
      } catch (error) {
        res.status(400).json({ error: 'Error updating stock', details: error });
      }
    };
    
    // Import products
    exports.importProducts = async (req, res) => {
      try {
        const products = req.body.products;  // Expecting an array of product objects
    
        // Add productId for each product
        const productsWithIds = products.map((product) => ({
          productId: `prod-${Date.now()}`,  // Generate a unique productId for each product
          ...product,
        }));
    
        await Product.insertMany(productsWithIds);
        res.status(201).json({ message: 'Products imported successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Error importing products', details: error });
      }
    };
    
    // Export products to CSV
    exports.exportProducts = async (req, res) => {
      try {
        const products = await Product.find();
        const csv = parse(products);  // Convert products array to CSV
        res.header('Content-Type', 'text/csv');
        res.attachment('products.csv');
        res.send(csv);
      } catch (error) {
        res.status(400).json({ error: 'Error exporting products', details: error });
      }
    };
    
    res.status(400).json({ error: 'Error exporting products', details: error });
  }
};
