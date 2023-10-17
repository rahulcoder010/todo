const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    // Get user input
    const { name, email, password } = req.body;
    
    // Create user object
    const user = new User({
      name,
      email,
      password
    });
    
    // Save user to database
    await user.save();
    
    // Send response
    res.status(200).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

// Update a user's information
exports.updateUser = async (req, res) => {
  try {
    // Get user input
    const { name, email } = req.body;
    const userId = req.params.id;
    
    // Find user in database
    const user = await User.findById(userId);
    
    // Check if user exists
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
      return;
    }
    
    // Update user information
    user.name = name;
    user.email = email;
    
    // Save updated user to database
    await user.save();
    
    // Send response
    res.status(200).json({
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

// Update a user's password
exports.updatePassword = async (req, res) => {
  try {
    // Get user input
    const { password } = req.body;
    const userId = req.params.id;
    
    // Find user in database
    const user = await User.findById(userId);
    
    // Check if user exists
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
      return;
    }
    
    // Update user password
    user.password = password;
    
    // Save updated user to database
    await user.save();
    
    // Send response
    res.status(200).json({
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

// Endpoint for login
exports.loginUser = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    
    // Find user in database
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
      return;
    }
    
    // Check if password is correct
    if (password !== user.password) {
      res.status(401).json({
        message: 'Incorrect password'
      });
      return;
    }
    
    // Perform login logic
    // ...
    
    // Send response
    res.status(200).json({
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

// Endpoint for forgot password
exports.forgotPassword = async (req, res) => {
  try {
    // Get user input
    const { email } = req.body;
    
    // Find user in database
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
      return;
    }
    
    // Perform forgot password logic
    // ...
    
    // Send response
    res.status(200).json({
      message: 'Password reset email sent'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}