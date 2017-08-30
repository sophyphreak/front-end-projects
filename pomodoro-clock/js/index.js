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
      React.createElement(Main, null)
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
        "h1",
        null,
        "Pomodoro Clock"
      ),
      React.createElement(
        "h6",
        null,
        "Created by Andrew Horn"
      )
    );
  };

  return TitleBar;
}(React.Component);

;

var Main = function (_React$Component3) {
  _inherits(Main, _React$Component3);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      breakTime: 5 * 60,
      sessionTime: 25 * 60,
      currentTime: 25 * 60,
      timer: null,
      timerStatus: 'pause',
      sessionStatus: 'session time'
    };
    return _this3;
  }

  Main.prototype.componentDidMount = function componentDidMount() {
    var _this4 = this;

    var timer = setInterval(function () {
      if (_this4.state.timerStatus === "run") {
        _this4.tick();
      };
    }, 1000);
    this.setState({ timer: timer });
  };

  Main.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clearInterval(this.state.timer);
  };

  Main.prototype.startStop = function startStop() {
    if (this.state.timerStatus === "run") {
      var timerStatus = "pause";
      this.setState({ timerStatus: timerStatus });
    } else {
      var timerStatus = "run";
      this.setState({ timerStatus: timerStatus });
    };
  };

  Main.prototype.tick = function tick() {
    if (this.state.currentTime === 0) {
      var bell = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2017/06/Ting-sound-effect.mp3');
      bell.play();
      if (this.state.sessionStatus === "session time") {
        var sessionStatus = "break";
        var currentTime = this.state.breakTime + 1;
        this.setState({ sessionStatus: sessionStatus, currentTime: currentTime });
      } else if (this.state.sessionStatus === "break") {
        var sessionStatus = "session time";
        var currentTime = this.state.sessionTime + 1;
        this.setState({ sessionStatus: sessionStatus, currentTime: currentTime });
      }
    }
    this.setState({
      currentTime: this.state.currentTime - 1
    });
  };

  Main.prototype.displayTime = function displayTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    sec = sec.toString();
    if (sec.length === 1) {
      sec = "0" + sec;
    }
    return min + ":" + sec;
  };

  Main.prototype.adjustBreak = function adjustBreak(inc) {
    if (this.state.timerStatus === "pause") {
      var breakTime = this.state.breakTime + inc * 60;
      if (breakTime < 1) {
        breakTime = 1;
      };
      this.setState({ breakTime: breakTime });
    };
  };

  Main.prototype.adjustSession = function adjustSession(inc) {
    if (this.state.timerStatus === "pause") {
      var sessionTime = this.state.sessionTime + inc * 60;
      if (sessionTime < 1) {
        sessionTime = 1;
      }
      var currentTime = sessionTime;
      this.setState({ sessionTime: sessionTime, currentTime: currentTime });
    };
  };

  Main.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "main" },
      React.createElement(
        "div",
        { id: "lengths" },
        React.createElement(BreakUi, {
          breakTime: this.state.breakTime,
          adjustBreak: this.adjustBreak.bind(this)
        }),
        React.createElement(SessionUi, {
          sessionTime: this.state.sessionTime,
          adjustSession: this.adjustSession.bind(this)
        })
      ),
      React.createElement(ClockUi, {
        sessionStatus: this.state.sessionStatus,
        currentTime: this.state.currentTime,
        displayTime: this.displayTime.bind(this),
        startStop: this.startStop.bind(this)
      })
    );
  };

  return Main;
}(React.Component);

;

var BreakUi = function (_React$Component4) {
  _inherits(BreakUi, _React$Component4);

  function BreakUi() {
    _classCallCheck(this, BreakUi);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  BreakUi.prototype.render = function render() {
    var _this6 = this;

    return React.createElement(
      "div",
      { className: "lengths__child" },
      React.createElement(
        "div",
        { className: "lengths__child2" },
        React.createElement(
          "p",
          null,
          "break length"
        )
      ),
      React.createElement(
        "div",
        { className: "lengths__child2" },
        React.createElement(
          "p",
          null,
          React.createElement(
            "button",
            { className: "btn btn-basic", onClick: function onClick() {
                return _this6.props.adjustBreak(-1);
              } },
            "-"
          ),
          React.createElement(
            "a",
            { className: "length-numbers" },
            this.props.breakTime / 60
          ),
          React.createElement(
            "button",
            { className: "btn btn-basic", onClick: function onClick() {
                return _this6.props.adjustBreak(1);
              } },
            "+"
          )
        )
      )
    );
  };

  return BreakUi;
}(React.Component);

;

var SessionUi = function (_React$Component5) {
  _inherits(SessionUi, _React$Component5);

  function SessionUi() {
    _classCallCheck(this, SessionUi);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  SessionUi.prototype.render = function render() {
    var _this8 = this;

    return React.createElement(
      "div",
      { className: "lengths__child" },
      React.createElement(
        "div",
        { className: "lengths__child2" },
        React.createElement(
          "p",
          null,
          "session length"
        )
      ),
      React.createElement(
        "div",
        { className: "lengths__child2" },
        React.createElement(
          "p",
          null,
          React.createElement(
            "button",
            { className: "btn btn-basic", onClick: function onClick() {
                return _this8.props.adjustSession(-1);
              } },
            "-"
          ),
          React.createElement(
            "a",
            { className: "length-numbers" },
            this.props.sessionTime / 60
          ),
          React.createElement(
            "button",
            { className: "btn btn-basic", onClick: function onClick() {
                return _this8.props.adjustSession(1);
              } },
            "+"
          )
        )
      )
    );
  };

  return SessionUi;
}(React.Component);

;

var ClockUi = function (_React$Component6) {
  _inherits(ClockUi, _React$Component6);

  function ClockUi() {
    _classCallCheck(this, ClockUi);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  ClockUi.prototype.render = function render() {
    var _this10 = this;

    return React.createElement(
      "div",
      { id: "clock" },
      React.createElement(
        "div",
        { className: "clock__child" },
        React.createElement(
          "a",
          { className: "clock__letters" },
          this.props.sessionStatus
        )
      ),
      React.createElement(
        "div",
        { className: "clock__child" },
        React.createElement(
          "a",
          { className: "clock__numbers" },
          this.props.displayTime(this.props.currentTime)
        )
      ),
      React.createElement(
        "button",
        { className: "btn btn-default clock__child", id: "start-stop", onClick: function onClick() {
            return _this10.props.startStop();
          } },
        "start - stop"
      )
    );
  };

  return ClockUi;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));