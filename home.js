import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Hospital Web</h1>
      <p>Manage your hospital data and patients with ease.</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Home;