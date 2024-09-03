class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0',
            operator: null,
            operand1: null,
            waitingForOperand2: false,
        };
    }

    handleDigit = (digit) => {
        const { display, waitingForOperand2 } = this.state;

        if (waitingForOperand2) {
            this.setState({ display: String(digit), waitingForOperand2: false });
        } else {
            this.setState({ display: display === '0' ? String(digit) : display + digit });
        }
    };

    handleOperator = (nextOperator) => {
        const { display, operator, operand1 } = this.state;
        const inputValue = parseFloat(display);

        if (operand1 == null) {
            this.setState({
                operand1: inputValue,
            });
        } else if (operator) {
            const result = this.performCalculation(operator, operand1, inputValue);
            this.setState({
                display: String(result),
                operand1: result,
            }); 
        }

        this.setState({
            waitingForOperand2: true, 
            operator: nextOperator,
        });
    };

    performCalculation(operator, operand1, operand2)  {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
            default:
                return operand2;
        }
    }

    handleClear = () => {
        this.setState({
            display: '0',
            operator: null,
            operand1: null,
            waitingForOperand2: false,
        });
    };

    handleDecimal = () => {
        const { display } = this.state;

        if (!display.includes('.')) {
            this.setState({ display: display + '.' });
        }
    };

    handleEqual = () => {
        const { display, operator, operand1 } = this.state;
        const inputValue = parseFloat(display);

        if (operator && operand1 !== null) {
            const result = this.performCalculation(operator, operand1, inputValue);
            this.setState({
                display: String(result),
                operand1: null,
                operator: null,
                waitingForOperand2: false,
            });
        }
    };

    render() {
        const { display } = this.state;

        return (
            <div className="calculator">
                <div className="display">{display}</div>
                <div className="keypad">
                    <button onClick={this.handleClear}>AC</button>
                    <button onClick={() => this.handleOperator('/')}>/</button>
                    <button onClick={() => this.handleOperator('*')}>*</button>
                    <button onClick={() => this.handleOperator('-')}>-</button>
                    <button onClick={() => this.handleDigit(7)}>7</button>
                    <button onClick={() => this.handleDigit(8)}>8</button>
                    <button onClick={() => this.handleDigit(9)}>9</button>
                    <button onClick={() => this.handleOperator('+')}>+</button>
                    <button onClick={() => this.handleDigit(4)}>4</button>
                    <button onClick={() => this.handleDigit(5)}>5</button>
                    <button onClick={() => this.handleDigit(6)}>6</button>
                    <button onClick={this.handleEqual}>=</button>
                    <button onClick={() => this.handleDigit(1)}>1</button>
                    <button onClick={() => this.handleDigit(2)}>2</button>
                    <button onClick={() => this.handleDigit(3)}>3</button>
                    <button onClick={() => this.handleDigit(0)}>0</button>
                    <button onClick={this.handleDecimal}>.</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));