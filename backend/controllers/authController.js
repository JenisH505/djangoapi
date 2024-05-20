// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Function to handle user registration
exports.register = async (req, res) => {
  try {
    // Destructure email, username, password, and role from request body
    const { email, username, password, role } = req.body;

    // Check if email or username is already registered
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      role: role || 'user', // Set default role to 'user' if not provided
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.login = async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Check if user with the given email exists
    const user = await User.findOne({ email });
    console.log("User:", user); // Log user object

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return user details and token as response
    res.status(200).json({ user, token }); // Include user details in response
  } catch (error) {
    console.error("Error in login function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
