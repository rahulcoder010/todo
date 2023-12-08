import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: '',
      num2: '',
      result: 0
    };
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  add() {
    const { num1, num2 } = this.state;
    this.setState({ result: Number(num1) + Number(num2) });
  }

  subtract() {
    const { num1, num2 } = this.state;
    this.setState({ result: Number(num1) - Number(num2) });
  }

  multiply() {
    const { num1, num2 } = this.state;
    this.setState({ result: Number(num1) * Number(num2) });
  }

  divide() {
    const { num1, num2 } = this.state;
    this.setState({ result: Number(num1) / Number(num2) });
  }

  render() {
    return (
      <div>
        <input
          type="number"
          name="num1"
          value={this.state.num1}
          onChange={event => this.handleInputChange(event)}
        />
        <input
          type="number"
          name="num2"
          value={this.state.num2}
          onChange={event => this.handleInputChange(event)}
        />
        <button onClick={() => this.add()}>Add</button>
        <button onClick={() => this.subtract()}>Subtract</button>
        <button onClick={() => this.multiply()}>Multiply</button>
        <button onClick={() => this.divide()}>Divide</button>
        <p>Result: {this.state.result}</p>
      </div>
    );
  }
}

export default Calculator;