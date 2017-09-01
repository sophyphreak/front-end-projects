"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function App(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(TitleBar, null),
    React.createElement(GameOfLife, null)
  );
};

var TitleBar = function (_React$Component) {
  _inherits(TitleBar, _React$Component);

  function TitleBar() {
    _classCallCheck(this, TitleBar);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  TitleBar.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "flex" },
      React.createElement(
        "h2",
        { className: "margin-auto" },
        "Conway's Game of Life"
      ),
      React.createElement(
        "h5",
        { className: "margin-auto" },
        "Created by Andrew Horn"
      ),
      React.createElement("br", null)
    );
  };

  return TitleBar;
}(React.Component);

;

var GameOfLife = function (_React$Component2) {
  _inherits(GameOfLife, _React$Component2);

  function GameOfLife(props) {
    _classCallCheck(this, GameOfLife);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      lifeMap: [],
      start: true,
      timer: null,
      generation: 0
    };
    _this2.toggleLifeMapValue = _this2.toggleLifeMapValue.bind(_this2);
    _this2.toggleStart = _this2.toggleStart.bind(_this2);
    return _this2;
  }

  GameOfLife.prototype.toggleLifeMapValue = function toggleLifeMapValue(row, val) {
    console.log(row, val);
    var lifeMap = this.state.lifeMap;

    lifeMap[row][val] = !lifeMap[row][val];
    this.setState({ lifeMap: lifeMap });
  };

  GameOfLife.prototype.componentWillMount = function componentWillMount() {
    if (this.state.lifeMap.length === 0) {
      var lifeMap = this.state.lifeMap;
      for (var i = 0; i < 30; i++) {
        var arr = [];
        for (var j = 0; j < 50; j++) {
          var randBool = Math.random() * 2 < 1;
          arr.push(randBool);
        }
        lifeMap.push(arr);
      };
      this.setState({ lifeMap: lifeMap });
    }
  };

  GameOfLife.prototype.componentDidMount = function componentDidMount() {
    var _this3 = this;

    var timer = setInterval(function () {
      if (_this3.state.start) {
        _this3.tick();
      };
    }, 100);
    this.setState({ timer: timer });
  };

  GameOfLife.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clearInterval(this.state.timer);
  };

  GameOfLife.prototype.tick = function tick() {
    var generation = this.state.generation;
    generation++;

    var lifeMap = this.state.lifeMap;
    var oldLifeMap = lifeMap.map(function (a) {
      return a.slice();
    });
    for (var row = 0; row < lifeMap.length; row++) {
      for (var val = 0; val < lifeMap[row].length; val++) {
        var bool = lifeMap[row][val];
        var newBool = this.determineLife(oldLifeMap, row, val, bool);
        lifeMap[row][val] = newBool;
        // if (row === 0 && val === 0) console.log("at (0,0)", oldLifeMap[0][0]);
      }
    }
    this.setState({ generation: generation, lifeMap: lifeMap });
  };

  GameOfLife.prototype.determineLife = function determineLife(lifeMap, row, val, bool) {
    var surroundSum = 0;
    var output = bool;

    for (var rowAdd = -1; rowAdd <= 1; rowAdd++) {
      for (var valAdd = -1; valAdd <= 1; valAdd++) {
        if (!(rowAdd === 0 && valAdd === 0)) {
          if (this.check(lifeMap, row, val, rowAdd, valAdd)) {
            surroundSum++;
          }
        }
      }
    }

    if (surroundSum === 3) output = true;
    if (surroundSum < 2 || 3 < surroundSum) output = false;

    return output;
  };

  GameOfLife.prototype.check = function check(lifeMap, row, val, rowAdd, valAdd) {
    var checkRow = this.checkValidRow(row + rowAdd);
    var checkVal = this.checkValidVal(val + valAdd);
    // if (row === 0 && val === 0) console.log(checkRow, checkVal, rowAdd, valAdd, lifeMap[checkRow][checkVal]);
    return lifeMap[checkRow][checkVal];
  };

  GameOfLife.prototype.checkValidRow = function checkValidRow(row) {
    var newRow = row;
    if (row < 0) newRow = 29;
    if (row > 29) newRow = 0;
    return newRow;
  };

  GameOfLife.prototype.checkValidVal = function checkValidVal(val) {
    var newVal = val;
    if (val < 0) newVal = 49;
    if (val > 49) newVal = 0;
    return newVal;
  };

  GameOfLife.prototype.toggleStart = function toggleStart() {
    var start = this.state.start;
    start = !start;
    this.setState({ start: start });
  };

  GameOfLife.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "flex" },
      React.createElement(GameBoard, {
        lifeMap: this.state.lifeMap,
        toggleLifeMapValue: this.toggleLifeMapValue }),
      React.createElement(ButtonArea, {
        start: this.state.start,
        toggleStart: this.toggleStart,
        generation: this.state.generation })
    );
  };

  return GameOfLife;
}(React.Component);

;

var GameBoard = function (_React$Component3) {
  _inherits(GameBoard, _React$Component3);

  function GameBoard() {
    _classCallCheck(this, GameBoard);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  GameBoard.prototype.renderSquares = function renderSquares() {
    var _this5 = this;

    var lifeMap = this.props.lifeMap;
    return lifeMap.map(function (row, rowIndex) {
      return row.map(function (col, colIndex) {
        return React.createElement(Square, {
          id: { row: rowIndex, col: colIndex },
          val: col,
          toggleLifeMapValue: _this5.props.toggleLifeMapValue });
      });
    });
  };

  GameBoard.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "squaresArea" },
      this.renderSquares()
    );
  };

  return GameBoard;
}(React.Component);

;

var ButtonArea = function (_React$Component4) {
  _inherits(ButtonArea, _React$Component4);

  function ButtonArea() {
    _classCallCheck(this, ButtonArea);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  ButtonArea.prototype.render = function render() {
    var _this7 = this;

    return React.createElement(
      "div",
      { className: "flex margin-auto" },
      React.createElement(
        "p",
        { className: "margin-auto" },
        "Generation: ",
        this.props.generation
      ),
      React.createElement("br", null),
      React.createElement(
        "button",
        { className: "btn btn-default margin-auto", onClick: function onClick() {
            return _this7.props.toggleStart();
          } },
        this.props.start ? "Pause" : "Start"
      ),
      React.createElement("br", null),
      React.createElement("br", null)
    );
  };

  return ButtonArea;
}(React.Component);

;

var Square = function (_React$Component5) {
  _inherits(Square, _React$Component5);

  function Square() {
    _classCallCheck(this, Square);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  Square.prototype.toggleAlive = function toggleAlive() {
    this.props.toggleLifeMapValue(this.props.id.row, this.props.id.col);
  };

  Square.prototype.render = function render() {
    var _this9 = this;

    var bg = undefined;
    if (this.props.val) {
      bg = "#E8E2DE";
    } else {
      bg = "black";
    }
    return React.createElement("button", { className: "life-button",
      onClick: function onClick() {
        return _this9.toggleAlive();
      },
      style: { backgroundColor: bg }
    });
  };

  return Square;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));