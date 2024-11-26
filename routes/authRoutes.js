

const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/usercontroller");


const {authMiddleware}= require ("../middlewares/authMiddleware")


// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for getting a user by ID
router.get("/getuser", getUserById);

// Route for updating a user by ID
router.put("/update", updateUser);

// Route for deleting a user by ID
router.delete("/delete", deleteUser);

router.get("/id", authMiddleware);

module.exports = router;
