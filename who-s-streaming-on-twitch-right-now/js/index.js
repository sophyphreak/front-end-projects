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
        { className: "title" },
        React.createElement(
          "h2",
          null,
          "Who's Streaming on Twitch Right Now?"
        ),
        React.createElement(
          "h5",
          null,
          "Created by Andrew Horn"
        )
      ),
      React.createElement(TwitchList, null)
    );
  };

  return App;
}(React.Component);

;

var TwitchList = function (_React$Component2) {
  _inherits(TwitchList, _React$Component2);

  function TwitchList(props) {
    _classCallCheck(this, TwitchList);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      jsons: {}
    };
    var twitches = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    _this2.populateJsons(twitches);
    return _this2;
  }

  TwitchList.prototype.populateJsons = function populateJsons(twitches) {
    var _this3 = this;

    twitches.map(function (twitch) {
      var axiosUrl = 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/' + twitch;

      axios.get(axiosUrl).then(function (res) {
        if (res.data.stream) {
          var jsons = {};
          jsons[twitch] = [res.data.stream.game, res.data.stream.channel.status];
          jsons = Object.assign(jsons, _this3.state.jsons);
          _this3.setState({ jsons: jsons });
        } else {
          var jsons = {};
          jsons[twitch] = null;
          jsons = Object.assign(jsons, _this3.state.jsons);
          _this3.setState({ jsons: jsons });
        };
      }).catch(function (error) {
        console.log(error, twitch);
      });
    });
  };

  TwitchList.prototype.renderTwitches = function renderTwitches() {
    var _this4 = this;

    return Object.keys(this.state.jsons).map(function (key) {
      try {
        return React.createElement(Twitch, { json: _this4.state.jsons[key], name: key });
      } catch (e) {
        console.log(e);
      }
    });
  };

  TwitchList.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "twitch-list" },
      Object.keys(this.state.jsons).length === 8 ? this.renderTwitches() : Object.keys(this.state.jsons).length / 8 * 100 + "% loaded"
    );
  };

  return TwitchList;
}(React.Component);

;

var Twitch = function (_React$Component3) {
  _inherits(Twitch, _React$Component3);

  function Twitch(props) {
    _classCallCheck(this, Twitch);

    return _possibleConstructorReturn(this, _React$Component3.call(this, props));
  }

  Twitch.prototype.renderTwitch = function renderTwitch(props) {
    var hyperlink = 'https://www.twitch.tv/' + this.props.name;

    if (this.props.json == null) {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          React.createElement(
            "a",
            { href: hyperlink, target: "_blank" },
            this.props.name
          ),
          "--------- Offline for now"
        )
      );
    } else {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          React.createElement(
            "a",
            { href: hyperlink, target: "_blank" },
            this.props.name
          ),
          "--------- ",
          this.props.json[0],
          ": ",
          this.props.json[1]
        )
      );
    };
  };

  Twitch.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      this.renderTwitch(this.props)
    );
  };

  return Twitch;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));