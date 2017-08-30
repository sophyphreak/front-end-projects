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
      React.createElement(
        "div",
        null,
        React.createElement(Weatherperson, null)
      )
    );
  };

  return App;
}(React.Component);

;

var Weatherperson = function (_React$Component2) {
  _inherits(Weatherperson, _React$Component2);

  function Weatherperson(props) {
    _classCallCheck(this, Weatherperson);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      lat: null,
      long: null,
      weather: null,
      temp: null,
      f: false,
      icon: null
    };
    _this2.convertToF = _this2.convertToF.bind(_this2);
    _this2.clickHandler = _this2.clickHandler.bind(_this2);
    _this2.cOrF = _this2.cOrF.bind(_this2);
    return _this2;
  }

  Weatherperson.prototype.componentWillMount = function componentWillMount() {
    var _this3 = this;

    this.getLocation();
    setTimeout(function () {
      _this3.getWeather();
    }, 2000);
  };

  Weatherperson.prototype.getLocation = function getLocation() {
    var _this4 = this;

    navigator.geolocation.getCurrentPosition(function (position) {
      _this4.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    });
  };

  Weatherperson.prototype.getWeather = function getWeather() {
    var _this5 = this;

    var axiosUrl = "https://fcc-weather-api.glitch.me/api/current?lat=" + this.state.lat + "&lon=" + this.state.long;

    axios.get(axiosUrl).then(function (res) {
      var weather = res.data.weather[0].main;
      _this5.setState({ weather: weather });
      var temp = res.data.main.temp.toFixed(0);
      _this5.setState({ temp: temp });
      var icon = res.data.weather[0].icon;
      _this5.setState({ icon: icon });
    }).error(function (error) {
      console.log(error);
    });
  };

  Weatherperson.prototype.clickHandler = function clickHandler(e) {
    this.setState({ f: !this.state.f });
  };

  Weatherperson.prototype.convertToF = function convertToF() {
    return (this.state.temp * 9 / 5 + 32).toFixed(0);
  };

  Weatherperson.prototype.cOrF = function cOrF() {
    if (this.state.f) {
      return "C";
    } else {
      return "F";
    }
  };

  Weatherperson.prototype.renderStuffThatLoads = function renderStuffThatLoads() {
    return React.createElement(StuffThatLoads, { weather: this.state.weather, icon: this.state.icon, f: this.state.f, temp: this.state.temp, convertToF: this.convertToF, clickHandler: this.clickHandler, cOrF: this.cOrF });
  };

  Weatherperson.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "root" },
      React.createElement(
        "h2",
        { className: "root__child" },
        "What's the Weather Like?"
      ),
      React.createElement("br", null),
      React.createElement(
        "h6",
        { className: "root__child" },
        "Created by Andrew Horn"
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      this.state.weather ? this.renderStuffThatLoads() : "Loading..."
    );
  };

  return Weatherperson;
}(React.Component);

;

var StuffThatLoads = function (_React$Component3) {
  _inherits(StuffThatLoads, _React$Component3);

  function StuffThatLoads() {
    _classCallCheck(this, StuffThatLoads);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  StuffThatLoads.prototype.render = function render() {
    var _this7 = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        null,
        this.props.weather
      ),
      React.createElement("img", { className: "root__child", src: this.props.icon }),
      React.createElement(
        "p",
        null,
        this.props.f ? this.props.convertToF() + "° F" : this.props.temp + "° C",
        " "
      ),
      React.createElement(
        "button",
        { className: "btn btn-link", onClick: function onClick(e) {
            return _this7.props.clickHandler(e);
          } },
        "Change to " + this.props.cOrF()
      )
    );
  };

  return StuffThatLoads;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));