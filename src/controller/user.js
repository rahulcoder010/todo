import React from 'react';

const User = () => {
  return (
    <div>
      {/* Register a new user */}
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Register</button>
      </form>

      {/* Update a user */}
      <form>
        <label htmlFor="update-username">New Username:</label>
        <input type="text" id="update-username" name="username" />

        <label htmlFor="update-email">New Email:</label>
        <input type="text" id="update-email" name="email" />

        <label htmlFor="update-password">New Password:</label>
        <input type="password" id="update-password" name="password" />

        <button type="submit">Update</button>
      </form>

      {/* Update password */}
      <form>
        <label htmlFor="update-password">New Password:</label>
        <input type="password" id="update-password" name="password" />

        <button type="submit">Update Password</button>
      </form>

      {/* Login */}
      <form>
        <label htmlFor="login-email">Email:</label>
        <input type="text" id="login-email" name="email" />

        <label htmlFor="login-password">Password:</label>
        <input type="password" id="login-password" name="password" />

        <button type="submit">Login</button>
      </form>

      {/* Forgot password */}
      <form>
        <label htmlFor="forgot-password-email">Email:</label>
        <input type="text" id="forgot-password-email" name="email" />

        <button type="submit">Forgot Password</button>
      </form>
    </div>
  );
};

export default User;