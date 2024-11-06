const mongoose = require('mongoose');

// Create a Schema for Product
const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'], 
        trim: true, 
        minlength: [2, 'Product name must be at least 2 characters long'] 
    },
    description: { 
        type: String, 
        required: [true, 'Product description is required'], 
        trim: true,
        minlength: [10, 'Product description must be at least 10 characters long'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Product price is required'], 
        min: [0, 'Product price must be a positive number'] 
    },
    dynamicPrice: { // Price that can change based on conditions
        type: Number,
        min: [0, 'Dynamic price must be a positive number']
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: [true, 'Product category is required']
    },
    vendorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vendor', 
        required: [true, 'Vendor ID is required'] 
    },
    imageUrls: [{ 
        type: String, 
        validate: {
            validator: (v) => {
                return v.every(url => /^(ftp|http|https):\/\/[^ "]+$/.test(url)); // Corrected line
            },
            message: 'Invalid image URL format'
        }
    }],
    stock: { 
        type: Number, 
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    lowStockThreshold: { 
        type: Number, 
        default: 10,
        min: [0, 'Threshold must be a non-negative number']
    },
    discount: {
        type: Number,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    },
    tags: [{ 
        type: String, 
        trim: true 
    }],
    seo: {
        title: { type: String, trim: true },
        metaDescription: { type: String, trim: true },
        keywords: [{ type: String, trim: true }]
    },
    ratings: {
        type: [Number],
        validate: {
            validator: function (v) {
                return v.every(rating => rating >= 1 && rating <= 5); // Ratings must be between 1 and 5
            },
            message: 'All ratings must be between 1 and 5'
        },
    },
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, trim: true },
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
    }],
    bundles: [{ // Allow bundling of products
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        discount: { type: Number, default: 0 }
    }],
    priceHistory: [{
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    }],
    version: {
        type: Number,
        default: 1 // Track product version
    },
    auditTrail: [{
        action: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users can add products to their wishlist
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
}, {
    timestamps: true, // Automatically create createdAt and updatedAt fields
});

// ... (rest of the schema methods and virtuals)
