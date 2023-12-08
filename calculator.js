import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 0,
      num2: 0,
      result: 0
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleAddition = () => {
    const result = parseInt(this.state.num1) + parseInt(this.state.num2);
    this.setState({ result });
  }

  handleSubtraction = () => {
    const result = parseInt(this.state.num1) - parseInt(this.state.num2);
    this.setState({ result });
  }

  render() {
    return (
      <div>
        <input type="number" name="num1" value={this.state.num1} onChange={this.handleInputChange} />
        <input type="number" name="num2" value={this.state.num2} onChange={this.handleInputChange} />
        <button onClick={this.handleAddition}>Add</button>
        <button onClick={this.handleSubtraction}>Subtract</button>
        <p>Result: {this.state.result}</p>
      </div>
    );
  }
}

export default Calculator;