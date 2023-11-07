import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => this.setState({ users: data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>User List</h1>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;