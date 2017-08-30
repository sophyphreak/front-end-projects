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
      { className: "flex column" },
      React.createElement(TitleBar, null),
      React.createElement(LeaderBoard, null)
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
      { id: "title-bar", className: "flex flex__child column" },
      React.createElement(
        "h2",
        { id: "title", className: "flex__child" },
        "Camper Leaderboard for freeCodeCamp"
      ),
      React.createElement(
        "h6",
        { id: "subtitle", className: "flex__child" },
        "Created by Andrew Horn"
      )
    );
  };

  return TitleBar;
}(React.Component);

;

var LeaderBoard = function (_React$Component3) {
  _inherits(LeaderBoard, _React$Component3);

  function LeaderBoard(props) {
    _classCallCheck(this, LeaderBoard);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      priority: "recent",
      recentList: [],
      allTimeList: []
    };
    _this3.setPriority = _this3.setPriority.bind(_this3);
    return _this3;
  }

  LeaderBoard.prototype.componentDidMount = function componentDidMount() {
    var _this4 = this;

    var axiosUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    axios.get(axiosUrl).then(function (res) {
      var recentList = res.data;
      _this4.setState({ recentList: recentList });
    }).catch(function (error) {
      console.log(error);
    });

    axiosUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    axios.get(axiosUrl).then(function (res) {
      var allTimeList = res.data;
      _this4.setState({ allTimeList: allTimeList });
    }).catch(function (error) {
      console.log(error);
    });
  };

  LeaderBoard.prototype.setPriority = function setPriority(priority) {
    this.setState({ priority: priority });
  };

  LeaderBoard.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "camper-table", className: "flex" },
      React.createElement(
        "div",
        { className: "flex__child" },
        React.createElement(CamperTable, {
          recentList: this.state.recentList,
          allTimeList: this.state.allTimeList,
          priority: this.state.priority,
          setPriority: this.setPriority })
      )
    );
  };

  return LeaderBoard;
}(React.Component);

;

var TableHeadings = function (_React$Component4) {
  _inherits(TableHeadings, _React$Component4);

  function TableHeadings() {
    _classCallCheck(this, TableHeadings);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  TableHeadings.prototype.render = function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "th",
        { className: "text-center" },
        "Rank"
      ),
      React.createElement(
        "th",
        { className: "text-center" },
        "User"
      ),
      React.createElement(
        "th",
        null,
        React.createElement(RecentButton, { priority: this.props.priority, setPriority: this.props.setPriority })
      ),
      React.createElement(
        "th",
        null,
        React.createElement(AllTimeButton, { priority: this.props.priority, setPriority: this.props.setPriority })
      )
    );
  };

  return TableHeadings;
}(React.Component);

;

var RecentButton = function (_React$Component5) {
  _inherits(RecentButton, _React$Component5);

  function RecentButton() {
    _classCallCheck(this, RecentButton);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  RecentButton.prototype.render = function render() {
    var _this7 = this;

    return React.createElement(
      "button",
      {
        className: "btn btn-link",
        onClick: function onClick() {
          return _this7.props.setPriority("recent");
        } },
      this.props.priority === "recent" ? "*Recent*" : "Recent"
    );
  };

  return RecentButton;
}(React.Component);

;

var AllTimeButton = function (_React$Component6) {
  _inherits(AllTimeButton, _React$Component6);

  function AllTimeButton() {
    _classCallCheck(this, AllTimeButton);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  AllTimeButton.prototype.render = function render() {
    var _this9 = this;

    return React.createElement(
      "button",
      {
        className: "btn btn-link",
        onClick: function onClick() {
          _this9.props.setPriority("allTime");
        } },
      this.props.priority === "allTime" ? "*All Time*" : "All Time"
    );
  };

  return AllTimeButton;
}(React.Component);

;

var CamperTable = function (_React$Component7) {
  _inherits(CamperTable, _React$Component7);

  function CamperTable() {
    _classCallCheck(this, CamperTable);

    return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
  }

  CamperTable.prototype.renderCampers = function renderCampers() {
    if (this.props.priority === "recent") {
      return this.props.recentList.map(function (val, index) {
        return React.createElement(Camper, {
          rank: index + 1,
          username: val.username,
          img: val.img,
          alltime: val.alltime,
          recent: val.recent,
          lastUpdate: val.lastUpdate });
      });
    } else {
      return this.props.allTimeList.map(function (val, index) {
        return React.createElement(Camper, {
          rank: index + 1,
          username: val.username,
          img: val.img,
          alltime: val.alltime,
          recent: val.recent,
          lastUpdate: val.lastUpdate });
      });
    };
  };

  CamperTable.prototype.render = function render() {
    return React.createElement(
      "table",
      null,
      React.createElement(
        FlipMove,
        null,
        React.createElement(TableHeadings, { priority: this.props.priority, setPriority: this.props.setPriority }),
        this.renderCampers()
      )
    );
  };

  return CamperTable;
}(React.Component);

;

var Camper = function (_React$Component8) {
  _inherits(Camper, _React$Component8);

  function Camper() {
    _classCallCheck(this, Camper);

    return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
  }

  Camper.prototype.render = function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        { className: "text-center" },
        this.props.rank
      ),
      React.createElement(
        "td",
        { className: "flex username" },
        React.createElement("img", { id: "user-image", src: this.props.img, height: "42", width: "42" }),
        React.createElement(
          "a",
          { id: "username", href: 'http://www.freecodecamp.com/' + this.props.username, target: "_blank" },
          this.props.username
        )
      ),
      React.createElement(
        "td",
        { className: "text-center" },
        this.props.recent
      ),
      React.createElement(
        "td",
        { className: "text-center" },
        this.props.alltime
      )
    );
  };

  return Camper;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));