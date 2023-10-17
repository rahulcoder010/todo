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