"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(TitleBar, null),
      React.createElement(Calculator, null)
    );
  };

  return App;
}(React.Component);

;

var TitleBar = function (_React$Component2) {
  _inherits(TitleBar, _React$Component2);

  function TitleBar() {
    _classCallCheck(this, TitleBar);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  TitleBar.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "title-bar" },
      React.createElement(
        "h3",
        null,
        "Calculator"
      ),
      React.createElement(
        "h6",
        { id: "subtitle" },
        "Created by Andrew Horn"
      )
    );
  };

  return TitleBar;
}(React.Component);

var Calculator = function (_React$Component3) {
  _inherits(Calculator, _React$Component3);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      display: 0,
      currentEq: [0],
      decimal: 1
    };
    _this3.handleInput = _this3.handleInput.bind(_this3);
    return _this3;
  }

  Calculator.prototype.longerNumber = function longerNumber(val, last) {
    if (this.state.decimal === 1) {
      var display = last * 10 + val;
      var currentEq = this.state.currentEq;
      currentEq[currentEq.length - 1] = display;
      this.setState({ display: display, currentEq: currentEq });
    } else if (this.state.decimal < 1) {
      var decimal = this.state.decimal;
      var display = last + val * decimal;
      var currentEq = this.state.currentEq;
      currentEq[currentEq.length - 1] = display;
      decimal *= .1;
      this.setState({ display: display, currentEq: currentEq, decimal: decimal });
    }
  };

  Calculator.prototype.resolveOperator = function resolveOperator(oldOper, newOper) {
    switch (oldOper) {
      case "+":
        this.addition(this.state.currentEq[0], this.state.currentEq[2], newOper);
        break;
      case "-":
        this.subtraction(this.state.currentEq[0], this.state.currentEq[2], newOper);
        break;
      case "*":
        this.multiplication(this.state.currentEq[0], this.state.currentEq[2], newOper);
        break;
      case "/":
        this.division(this.state.currentEq[0], this.state.currentEq[2], newOper);
        break;
      case "=":
        var currentEq = [this.state.currentEq[2], newOper];
        this.setState({ currentEq: currentEq });
    };
  };

  Calculator.prototype.handleInput = function handleInput(val) {

    if (val === 'AC') {
      this.setState({ display: 0, currentEq: [0], decimal: 1 });
    }

    if (val === 'CE') {
      var display = 0;
      if (this.state.currentEq.length <= 2) {
        this.setState({ display: display, currentEq: [0], decimal: 1 });
      } else if (this.state.currentEq.length === 3) {
        var currentEq = this.state.currentEq.slice(0, 2);
        this.setState({ display: display, currentEq: currentEq, decimal: 1 });
      }
    }

    if (val === '.') {
      this.setState({ decimal: .1 });
    }

    var last = this.state.currentEq[this.state.currentEq.length - 1];

    if (this.state.currentEq.length === 1) {
      if (typeof val === "number") {
        this.longerNumber(val, last);
      } else if ("+-*/".indexOf(val) > -1) {
        var currentEq = this.state.currentEq;
        currentEq.push(val);
        this.setState({ currentEq: currentEq });
      }
    } else if (this.state.currentEq.length === 2) {

      if (typeof val === "number") {
        var display = val;
        if (this.state.decimal < 1) {
          display = val * .1;
        }
        var currentEq = this.state.currentEq;
        currentEq.push(display);
        this.setState({ display: display, currentEq: currentEq });
      } else if ("+-*/".indexOf(val) > -1) {
        var currentEq = this.state.currentEq.slice(0, this.state.currentEq.length - 1);
        currentEq.push(val);
        this.setState({ currentEq: currentEq });
      }
    } else if (this.state.currentEq.length === 3) {

      if (typeof val === "number") {
        this.longerNumber(val, last);
      } else if ("+-*/=".indexOf(val) > -1) {
        this.resolveOperator(this.state.currentEq[1], val);
      }
    }
  };

  Calculator.prototype.addition = function addition(first, last, newOper) {
    var sum = first + last;
    var currentEq = [sum, newOper];
    this.setState({ display: sum, currentEq: currentEq, decimal: 1 });
  };

  Calculator.prototype.subtraction = function subtraction(first, last, newOper) {
    var difference = first - last;
    var currentEq = [difference, newOper];
    this.setState({ display: difference, currentEq: currentEq, decimal: 1 });
  };

  Calculator.prototype.multiplication = function multiplication(first, last, newOper) {
    var product = first * last;
    var currentEq = [product, newOper];
    this.setState({ display: product, currentEq: currentEq, decimal: 1 });
  };

  Calculator.prototype.division = function division(first, last, newOper) {
    var quotient = first / last;
    var currentEq = [quotient, newOper];
    this.setState({ display: quotient, currentEq: currentEq, decimal: 1 });
  };

  Calculator.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "calculator" },
      React.createElement(
        "div",
        { id: "screen" },
        React.createElement(Screen, { display: this.state.display })
      ),
      React.createElement(ButtonMap, { handleInput: this.handleInput })
    );
  };

  return Calculator;
}(React.Component);

;

// For debugging:
//                 <p id="debug">
//   <br/>display: {this.state.display}
//   <br/>currentEq: [{this.state.currentEq[0]}, {this.state.currentEq[1]}, {this.state.currentEq[2]}]
//   <br/>curentEq.length: {this.state.currentEq.length}
//   <br/>decimal: {this.state.decimal}
// </p>

var Screen = function (_React$Component4) {
  _inherits(Screen, _React$Component4);

  function Screen() {
    _classCallCheck(this, Screen);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Screen.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "screen-text" },
      this.props.display
    );
  };

  return Screen;
}(React.Component);

;

var ButtonMap = function (_React$Component5) {
  _inherits(ButtonMap, _React$Component5);

  function ButtonMap(props) {
    _classCallCheck(this, ButtonMap);

    return _possibleConstructorReturn(this, _React$Component5.call(this, props));
  }

  ButtonMap.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "button-map" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Button, { value: "AC", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "CE", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "/", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "*", handleInput: this.props.handleInput })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Button, { value: "7", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "8", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "9", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "-", handleInput: this.props.handleInput })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Button, { value: "4", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "5", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "6", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "+", handleInput: this.props.handleInput })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Button, { value: "1", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "2", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "3", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: "=", handleInput: this.props.handleInput })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Button, { value: "0", handleInput: this.props.handleInput }),
        React.createElement(Button, { value: ".", handleInput: this.props.handleInput })
      )
    );
  };

  return ButtonMap;
}(React.Component);

;

var Button = function (_React$Component6) {
  _inherits(Button, _React$Component6);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this6 = _possibleConstructorReturn(this, _React$Component6.call(this, props));

    _this6.handleClick = _this6.handleClick.bind(_this6);
    return _this6;
  }

  Button.prototype.handleClick = function handleClick(props) {
    console.log(this.props.value + ' clicked');
    if ("1234567890".indexOf(this.props.value) > -1) {
      this.props.handleInput(parseInt(this.props.value));
    } else {
      this.props.handleInput(this.props.value);
    }
  };

  Button.prototype.render = function render() {
    var _this7 = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { onClick: function onClick() {
            return _this7.handleClick();
          } },
        " ",
        this.props.value,
        " "
      )
    );
  };

  return Button;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));