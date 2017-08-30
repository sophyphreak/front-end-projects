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
      { id: "App" },
      React.createElement(TitleBar, null),
      React.createElement("p", null),
      React.createElement(Game, null)
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
      { className: "App__child" },
      React.createElement("p", null),
      React.createElement(
        "h2",
        { className: "TitleBar__child" },
        "Tic - Tac - Toe"
      ),
      React.createElement("p", null),
      React.createElement(
        "h6",
        { className: "TitleBar__child" },
        "Created by Andrew Horn"
      ),
      React.createElement("p", null)
    );
  };

  return TitleBar;
}(React.Component);

;

var Game = function (_React$Component3) {
  _inherits(Game, _React$Component3);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      game: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]],
      player: null,
      comp: null,
      gameState: "play"
    };
    _this3.setGame = _this3.setGame.bind(_this3);
    return _this3;
  }

  // componentWillMount() {
  //   this.setState({ game: [
  //       ["~", "~", "~"],
  //       ["~", "~", "~"],
  //       ["~", "~", "~"]
  //     ],
  //   });
  // }

  Game.prototype.setGame = function setGame(val, row, col) {
    if (this.state.gameState === "play") {
      var game = this.state.game.slice();
      if (game[row][col] === " ") {
        game[row][col] = val;
        this.setState({ game: game });
        this.checkGameEnd(function () {});
        if (this.state.gameState === "play" && val === this.state.player) {
          this.compPlay();
        };
      };
    };
  };

  Game.prototype.compPlay = function compPlay() {
    if (this.state.gameState === "play") {
      var row = Math.floor(Math.random() * 3);
      var col = Math.floor(Math.random() * 3);
      if (this.state.game[row][col] !== " ") {
        this.compPlay();
      } else {
        this.setGame(this.state.comp, row, col);
      };
    };
  };

  Game.prototype.checkGameEnd = function checkGameEnd(_callback) {
    this.checkIfWinner(function () {});
    _callback();
  };

  Game.prototype.checkIfWinner = function checkIfWinner(_callback) {
    var _this4 = this;

    var game = this.state.game.slice();
    // check row
    game.forEach(function (row, index) {
      var rowCheck = row.reduce(function (sum, space) {
        if (space === "X") {
          return sum + 1;
        } else if (space === "O") {
          return sum - 1;
        } else {
          return sum;
        }
      }, 0);
      if (rowCheck === 3) {
        _this4.setState({ gameState: "X wins!" });
        _this4.endGame();
      } else if (rowCheck === -3) {
        _this4.setState({ gameState: "O wins!" });
        _this4.endGame();
      };
    });
    // check column
    var gameTranspose = game[0].map(function (col, i) {
      return game.map(function (row) {
        return row[i];
      });
    });
    gameTranspose.forEach(function (row, index) {
      var rowCheck = row.reduce(function (sum, space) {
        if (space === "X") {
          return sum + 1;
        } else if (space === "O") {
          return sum - 1;
        } else {
          return sum;
        }
      }, 0);
      if (rowCheck === 3) {
        _this4.setState({ gameState: "X wins!" });
        _this4.endGame();
      } else if (rowCheck === -3) {
        _this4.setState({ gameState: "O wins!" });
        _this4.endGame();
      };
      _callback();
    });

    //check 1st diagonal
    if (game[0][0] === "X" && game[1][1] === "X" && game[2][2] === "X") {
      this.setState({ gameState: "X wins!" });
      this.endGame();
    } else if (game[0][0] === "O" && game[1][1] === "O" && game[2][2] === "O") {
      this.setState({ gameState: "O wins!" });
      this.endGame();
    };

    //check 2nd diagonal
    if (game[0][2] === "X" && game[1][1] === "X" && game[2][0] === "X") {
      this.setState({ gameState: "X wins!" });
      this.endGame();
    } else if (game[0][2] === "O" && game[1][1] === "O" && game[2][0] === "O") {
      this.setState({ gameState: "O wins!" });
      this.endGame();
    };

    //check for draw
    var flattened = game.reduce(function (a, b) {
      return a.concat(b);
    });
    var takenSpace = flattened.reduce(function (sum, val) {
      if (val === "X" || val === "O") {
        return sum + 1;
      } else {
        return sum;
      };
    }, 0);
    if (takenSpace === 9) {
      setTimeout(function () {
        if (takenSpace === 9 && _this4.state.gameState === "play") {
          _this4.setState({ gameState: "draw" });
          _this4.endGame();
        };
      }, 500);
    }
  };

  Game.prototype.endGame = function endGame() {
    var _this5 = this;

    setTimeout(function () {
      _this5.setState({
        gameState: "play",
        game: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
      });
    }, 3000);
  };

  Game.prototype.returnBegin = function returnBegin() {
    var _this6 = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        { className: "Game__child" },
        "Play as X or O?"
      ),
      React.createElement("p", null),
      React.createElement(
        "div",
        { className: "Game__child" },
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: function onClick() {
              return _this6.setState({ player: "X", comp: "O" });
            } },
          "X"
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: function onClick() {
              return _this6.setState({ player: "O", comp: "X" });
            } },
          "O"
        )
      )
    );
  };

  Game.prototype.returnBoard = function returnBoard() {
    return React.createElement(Board, { setGame: this.setGame, game: this.state.game, player: this.state.player });
  };

  Game.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "App__child" },
      this.state.player == null ? this.returnBegin() : this.returnBoard(),
      React.createElement("p", null),
      React.createElement(
        "p",
        { className: "Game__child" },
        this.state.gameState,
        "!"
      )
    );
  };

  return Game;
}(React.Component);

;

// //debugging code:
{/* <p>game:</p>
  <p>[{this.state.game[0]}]</p>
  <p>[{this.state.game[1]}]</p>
  <p>[{this.state.game[2]}]</p> */}

var Board = function (_React$Component4) {
  _inherits(Board, _React$Component4);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Board.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "board" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Space, { row: 0, col: 0, setGame: this.props.setGame, game: this.props.game, player: this.props.player }),
        React.createElement(Space, { row: 0, col: 1, setGame: this.props.setGame, game: this.props.game, player: this.props.player }),
        React.createElement(Space, { row: 0, col: 2, setGame: this.props.setGame, game: this.props.game, player: this.props.player })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Space, { row: 1, col: 0, setGame: this.props.setGame, game: this.props.game, player: this.props.player }),
        React.createElement(Space, { row: 1, col: 1, setGame: this.props.setGame, game: this.props.game, player: this.props.player }),
        React.createElement(Space, { row: 1, col: 2, setGame: this.props.setGame, game: this.props.game, player: this.props.player })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Space, { row: 2, col: 0, setGame: this.props.setGame, game: this.props.game, player: this.props.player }),
        React.createElement(Space, { row: 2, col: 1, setGame: this.props.setGame, game: this.props.game, player: this.props.player }),
        React.createElement(Space, { row: 2, col: 2, setGame: this.props.setGame, game: this.props.game, player: this.props.player })
      )
    );
  };

  return Board;
}(React.Component);

;

var Space = function (_React$Component5) {
  _inherits(Space, _React$Component5);

  function Space() {
    _classCallCheck(this, Space);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  Space.prototype.handleClick = function handleClick() {
    this.props.setGame(this.props.player, this.props.row, this.props.col);
  };

  Space.prototype.render = function render() {
    var _this9 = this;

    return React.createElement(
      "div",
      { className: "button" },
      React.createElement(
        "button",
        { className: "btn btn-default", onClick: function onClick() {
            return _this9.handleClick();
          } },
        this.props.game[this.props.row][this.props.col]
      )
    );
  };

  return Space;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));