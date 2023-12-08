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
    
    handleNum1Change = (event) => {
        this.setState({ num1: parseFloat(event.target.value) });
    }
    
    handleNum2Change = (event) => {
        this.setState({ num2: parseFloat(event.target.value) });
    }
    
    handleAdd = () => {
        const result = this.state.num1 + this.state.num2;
        this.setState({ result });
    }
    
    handleSubtract = () => {
        const result = this.state.num1 - this.state.num2;
        this.setState({ result });
    }
    
    handleMultiply = () => {
        const result = this.state.num1 * this.state.num2;
        this.setState({ result });
    }
    
    handleDivide = () => {
        const result = this.state.num1 / this.state.num2;
        this.setState({ result });
    }
    
    render() {
        return (
            <div>
                <input type="number" value={this.state.num1} onChange={this.handleNum1Change} />
                <input type="number" value={this.state.num2} onChange={this.handleNum2Change} />
                <button onClick={this.handleAdd}>Add</button>
                <button onClick={this.handleSubtract}>Subtract</button>
                <button onClick={this.handleMultiply}>Multiply</button>
                <button onClick={this.handleDivide}>Divide</button>
                <p>Result: {this.state.result}</p>
            </div>
        );
    }
}

export default Calculator;