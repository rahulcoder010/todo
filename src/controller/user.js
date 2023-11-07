import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;