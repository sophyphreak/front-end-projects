"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      winner: false
    };
    _this.toggleWinner = _this.toggleWinner.bind(_this);
    return _this;
  }

  App.prototype.toggleWinner = function toggleWinner() {
    var winner = !this.state.winner;
    this.setState({ winner: winner });
  };

  App.prototype.renderPlayArea = function renderPlayArea() {
    var _this2 = this;

    if (this.state.winner === false) {
      return React.createElement(Simon, { toggleWinner: this.toggleWinner });
    } else {
      setTimeout(function () {
        var winner = false;
        _this2.setState({ winner: winner });
      }, 5000);
      return React.createElement(
        "h2",
        null,
        "You Win!!!"
      );
    }
  };

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(TitleBar, null),
      this.renderPlayArea()
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
      { className: "flex-column" },
      React.createElement(
        "h1",
        { className: "title" },
        "Simon Game"
      ),
      React.createElement(
        "h6",
        { className: "title subtitle" },
        "Created by Andrew Horn"
      )
    );
  };

  return TitleBar;
}(React.Component);

;

var Simon = function (_React$Component3) {
  _inherits(Simon, _React$Component3);

  function Simon(props) {
    _classCallCheck(this, Simon);

    var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this4.state = {
      answerArr: [],
      playerArr: [],
      playerTurn: false,
      strict: false
    };
    _this4.handleClick = _this4.handleClick.bind(_this4);
    return _this4;
  }

  Simon.prototype.handleClick = function handleClick(color) {
    var _this5 = this;

    var errorAudio = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2015/08/Error.mp3?_=1");
    if (this.state.playerTurn === true) {

      var playerArr = this.state.playerArr;
      playerArr.push(color);
      var answerArr = this.state.answerArr.slice(0, playerArr.length);
      this.setState({ playerArr: playerArr });

      if (_.isEqual(playerArr, answerArr) && this.state.playerArr.length === this.state.answerArr.length && this.state.answerArr.length === 20) {

        this.props.toggleWinner();
      } else if (_.isEqual(playerArr, answerArr) && this.state.playerArr.length === this.state.answerArr.length) {

        var playerTurn = false;
        playerArr = [];
        this.setState({ playerArr: playerArr, playerTurn: playerTurn });
        setTimeout(function () {
          _this5.addNewColor();
        }, 1000);
      } else if (!_.isEqual(playerArr, answerArr) && !this.state.strict) {
        var playerTurn = false;
        var _playerArr = [];
        this.setState({ playerArr: _playerArr, playerTurn: playerTurn });
        setTimeout(function () {
          errorAudio.play();
        }, 700);
        setTimeout(function () {
          _this5.playArr(_this5.state.answerArr.length, _this5.state.answerArr, 750, 0);
        }, 1500);
      } else if (!_.isEqual(playerArr, answerArr) && this.state.strict) {
        var playerTurn = false;
        var _playerArr2 = [];
        var _answerArr = [];
        this.setState({ answerArr: _answerArr, playerArr: _playerArr2, playerTurn: playerTurn });
        setTimeout(function () {
          errorAudio.play();
        }, 700);
        setTimeout(function () {
          _this5.addNewColor();
        }, 1500);
      };
    };
  };

  Simon.prototype.addNewColor = function addNewColor() {
    var answerArr = undefined;
    answerArr = this.state.answerArr;

    var newColor = undefined;
    var colorNum = Math.floor(Math.random() * 4);
    switch (colorNum) {
      case 0:
        newColor = "G";
        break;
      case 1:
        newColor = "R";
        break;
      case 2:
        newColor = "Y";
        break;
      case 3:
        newColor = "B";
        break;
    };
    answerArr.push(newColor);
    this.setState({ answerArr: answerArr });
    this.playArr(answerArr.length, answerArr, 750, 0);
  };

  Simon.prototype.playArr = function playArr(n, answerArr, delay, index) {
    var _this6 = this;

    if (n > 0) {
      document.getElementById(answerArr[index]).click();
      if (n > 1) {
        setTimeout(function () {
          _this6.playArr(n - 1, answerArr, delay, index + 1);
        }, delay);
      }
    }
    if (n === 1) {
      var playerTurn = true;
      this.setState({ playerTurn: playerTurn });
    }
  };

  Simon.prototype.start = function start() {
    var _this7 = this;

    if (this.state.answerArr.length === 0) {
      setTimeout(function () {
        return _this7.addNewColor();
      }, 250);
    } else if (this.state.answerArr.length > 0) {
      if (this.state.playerTurn === true) {
        this.setState({
          answerArr: [],
          playerArr: [],
          playerTurn: false
        });
        setTimeout(function () {
          _this7.addNewColor();
        }, 500);
      };
    };
  };

  Simon.prototype.render = function render() {
    var _this8 = this;

    return React.createElement(
      "div",
      { id: "Simon" },
      React.createElement(
        "div",
        { className: "flex Simon__child" },
        React.createElement(
          "div",
          null,
          React.createElement(ColorButton, { handleClick: this.handleClick, color: "G" }),
          React.createElement(ColorButton, { handleClick: this.handleClick, color: "R" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(ColorButton, { handleClick: this.handleClick, color: "Y" }),
          React.createElement(ColorButton, { handleClick: this.handleClick, color: "B" })
        )
      ),
      React.createElement(
        "h5",
        { className: "Simon__child count" },
        "Count: ",
        this.state.answerArr.length
      ),
      React.createElement(
        "div",
        { className: "Simon__child" },
        React.createElement(
          "button",
          { className: "btn btn-primary lower-button", onClick: function onClick() {
              _this8.start();
            } },
          this.state.answerArr.length > 0 ? "Restart" : "Begin"
        ),
        React.createElement(
          "button",
          { className: "btn btn-primary lower-button", onClick: function onClick() {
              var strict = !_this8.state.strict;
              _this8.setState({ strict: strict });
            } },
          "Strict: ",
          this.state.strict ? "ON" : "OFF"
        )
      )
    );
  };

  return Simon;
}(React.Component);

;

// <p>answerArr: [{this.state.answerArr}]</p>
// <p>playerArr: [{this.state.playerArr}]</p>
// <p>playerTurn: {this.state.playerTurn ? "true" : "false"}</p>
// <p>strict: {this.state.strict ? "on" : "off"}</p>

var ColorButton = function (_React$Component4) {
  _inherits(ColorButton, _React$Component4);

  function ColorButton(props) {
    _classCallCheck(this, ColorButton);

    var _this9 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this9.state = {
      tone: null,
      darker: null,
      lighter: null,
      bg: null
    };
    return _this9;
  }

  ColorButton.prototype.componentDidMount = function componentDidMount() {
    if (this.props.color === "G") {
      var tone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
      var lighter = "green";
      var darker = "#004d00";
      var bg = lighter;
      this.setState({ tone: tone, darker: darker, lighter: lighter, bg: bg });
    };
    if (this.props.color === "R") {
      var tone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
      var lighter = "red";
      var darker = "#b30000";
      var bg = lighter;
      this.setState({ tone: tone, darker: darker, lighter: lighter, bg: bg });
    };
    if (this.props.color === "Y") {
      var tone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
      var lighter = "yellow";
      var darker = "#cccc00";
      var bg = lighter;
      this.setState({ tone: tone, darker: darker, lighter: lighter, bg: bg });
    };
    if (this.props.color === "B") {
      var tone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
      var lighter = "blue";
      var darker = "#000099";
      var bg = lighter;
      this.setState({ tone: tone, darker: darker, lighter: lighter, bg: bg });
    };
  };

  ColorButton.prototype.render = function render() {
    var _this10 = this;

    var bg = this.state.bg;
    return React.createElement(
      "div",
      null,
      React.createElement("button", {
        className: "btn btn-default color-button",
        style: { backgroundColor: bg },
        onClick: function onClick() {
          _this10.state.tone.play().catch(function (e) {
            console.log(e);
          });
          _this10.setState({ bg: _this10.state.darker });
          setTimeout(function () {
            _this10.setState({ bg: _this10.state.lighter });
          }, 250);
          _this10.props.handleClick(_this10.props.color);
        },
        id: this.props.color })
    );
  };

  return ColorButton;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));