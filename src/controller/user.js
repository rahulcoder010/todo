const User = require('../model/user');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.updateOne({ _id: req.params.id }, { username, password });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Update password for an existing user
const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    await User.updateOne({ _id: req.params.id }, { password });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
};

module.exports = {
  registerUser,
  updateUser,
  updatePassword,
};