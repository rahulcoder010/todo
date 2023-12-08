import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: '',
      num2: '',
      result: ''
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddition = () => {
    const { num1, num2 } = this.state;
    const result = parseFloat(num1) + parseFloat(num2);
    this.setState({ result });
  };

  handleSubtraction = () => {
    const { num1, num2 } = this.state;
    const result = parseFloat(num1) - parseFloat(num2);
    this.setState({ result });
  };

  handleMultiplication = () => {
    const { num1, num2 } = this.state;
    const result = parseFloat(num1) * parseFloat(num2);
    this.setState({ result });
  };

  handleDivision = () => {
    const { num1, num2 } = this.state;
    const result = parseFloat(num1) / parseFloat(num2);
    this.setState({ result });
  };

  render() {
    const { num1, num2, result } = this.state;
    return (
      <div>
        <input
          type="number"
          name="num1"
          value={num1}
          onChange={this.handleInputChange}
        />
        <input
          type="number"
          name="num2"
          value={num2}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleAddition}>+</button>
        <button onClick={this.handleSubtraction}>-</button>
        <button onClick={this.handleMultiplication}>*</button>
        <button onClick={this.handleDivision}>/</button>
        <h3>Result: {result}</h3>
      </div>
    );
  }
}

export default Calculator;