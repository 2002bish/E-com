const User = require('../models/userModel'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const asyncHandler= require("express-async-handler");
// Register a new user

exports.registerUser = async (req, res) => {
    const { firstname, lastname, email, mobile, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            firstname,
            lastname,
            email,
            mobile,
            password: hashedPassword,
        });

        // Save the user
        const savedUser = await user.save();

        // Respond with the new user's information (excluding password)
        res.status(201).json({ id: savedUser._id, firstname: savedUser.firstname, lastname: savedUser.lastname, email: savedUser.email });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error });
    }
};

// Log in a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        
        // Send success response
        return res.status(200).json({
            message: "Login successful",
            
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Failed to log in", error: error.message || error });
    }
};

// Get details of a specific user
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user', error });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, mobile } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { firstname, lastname, email, mobile },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};


