import React from 'react';

const User = () => {
  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        throw new Error('Failed to register user');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = await fetch(`/api/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const handleUpdatePassword = async (id) => {
    try {
      const response = await fetch(`/api/update/password/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const handleLogin = async () => {
    try {
      // Implement login logic here
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const handleForgotPassword = async () => {
    try {
      // Implement forgot password logic here
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => handleUpdateUser(userId)}>Update User</button>
      <button onClick={() => handleUpdatePassword(userId)}>Update Password</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleForgotPassword}>Forgot Password</button>
    </div>
  );
};

export default User;