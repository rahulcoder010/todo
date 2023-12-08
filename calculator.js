import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNum: '',
      operator: '',
      secondNum: '',
      result: ''
    };
  }

  handleNumberClick(number) {
    this.setState(prevState => {
      let updatedState = {};
      if (prevState.operator) {
        updatedState.secondNum = prevState.secondNum + number;
      } else {
        updatedState.firstNum = prevState.firstNum + number;
      }
      return updatedState;
    });
  }

  handleOperatorClick(operator) {
    this.setState({
      operator: operator
    });
  }

  handleEqualClick() {
    let { firstNum, operator, secondNum } = this.state;
    let result;
    switch (operator) {
      case '+':
        result = +firstNum + +secondNum;
        break;
      case '-':
        result = +firstNum - +secondNum;
        break;
      case '*':
        result = +firstNum * +secondNum;
        break;
      case '/':
        result = +firstNum / +secondNum;
        break;
      default:
        result = '';
    }
    this.setState({
      result: result
    });
  }

  render() {
    return (
      <div className="calculator">
        <h1>Calculator</h1>
        <input value={this.state.firstNum} readOnly />
        <div className="buttons">
          <button onClick={() => this.handleNumberClick('1')}>1</button>
          <button onClick={() => this.handleNumberClick('2')}>2</button>
          <button onClick={() => this.handleNumberClick('3')}>3</button>
          <button onClick={() => this.handleOperatorClick('+')}>+</button>
          <button onClick={() => this.handleNumberClick('4')}>4</button>
          <button onClick={() => this.handleNumberClick('5')}>5</button>
          <button onClick={() => this.handleNumberClick('6')}>6</button>
          <button onClick={() => this.handleOperatorClick('-')}>-</button>
          <button onClick={() => this.handleNumberClick('7')}>7</button>
          <button onClick={() => this.handleNumberClick('8')}>8</button>
          <button onClick={() => this.handleNumberClick('9')}>9</button>
          <button onClick={() => this.handleOperatorClick('*')}>*</button>
          <button onClick={() => this.handleOperatorClick('/')} >/</button>
          <button onClick={() => this.handleNumberClick('0')}>0</button>
          <button onClick={() => this.handleEqualClick()}>=</button>
        </div>
        <h2>Result: {this.state.result}</h2>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));