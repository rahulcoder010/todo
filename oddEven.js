import React from 'react';

class OddEven extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      result: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      number: e.target.value
    });
  }

  checkOddEven = () => {
    if (this.state.number % 2 === 0) {
      this.setState({
        result: 'Even'
      });
    } else {
      this.setState({
        result: 'Odd'
      });
    }
  }

  render() {
    return (
      <div>
        <input type="number" value={this.state.number} onChange={this.handleChange} />
        <button onClick={this.checkOddEven}>Check</button>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default OddEven;