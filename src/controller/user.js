router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateResetToken();
    const resetPasswordTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = resetPasswordTokenExpiry;

    await user.save();

    // Send the reset password email
    sendResetPasswordEmail(user.email, resetToken);

    res.json({ message: 'Reset password email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

function generateResetToken() {
  // Generate a random reset token using a library or algorithm
}

function sendResetPasswordEmail(email, resetToken) {
  // Logic to send the reset password email
}