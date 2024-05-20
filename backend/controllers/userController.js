// authController.js
const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserById function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update user details
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Update user document
    await User.findByIdAndUpdate(userId, updates);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error in updateUser function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete user document
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

