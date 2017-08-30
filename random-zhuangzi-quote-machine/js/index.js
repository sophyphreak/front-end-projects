"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function App(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(TitleBar, null),
    React.createElement(Machine, null)
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
      { className: "title-bar" },
      React.createElement(
        "div",
        { className: "wrapper" },
        React.createElement(
          "h1",
          null,
          "Random Zhuangzi Quote Machine"
        ),
        React.createElement(
          "h2",
          { className: "title-bar__subtitle" },
          "Created by Andrew Horn"
        )
      )
    );
  };

  return TitleBar;
}(React.Component);

;

var Machine = function (_React$Component2) {
  _inherits(Machine, _React$Component2);

  function Machine(props) {
    _classCallCheck(this, Machine);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      currentQuote: _this2.getRandomInt(0, quoteList.length)
    };
    _this2.getQuote = _this2.getQuote.bind(_this2);
    _this2.getQuoteNumber = _this2.getQuoteNumber.bind(_this2);
    return _this2;
  }

  Machine.prototype.getRandomInt = function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  Machine.prototype.getQuoteNumber = function getQuoteNumber(e) {
    this.setState({ currentQuote: this.getRandomInt(0, quoteList.length) });
  };

  Machine.prototype.getQuote = function getQuote() {
    return quoteList[this.state.currentQuote];
  };

  Machine.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "zhuangzi Machine" },
        React.createElement(QuoteBox, { currentQuote: this.getQuote() }),
        React.createElement(
          "div",
          { className: "buttonBox justify-start" },
          React.createElement(TwitterButton, { currentQuote: this.getQuote() }),
          React.createElement(NewQuoteButton, { clickHandler: this.getQuoteNumber })
        )
      ),
      React.createElement(
        "p",
        { className: "who-is-zhuangzi" },
        React.createElement(
          "a",
          { href: "https://en.wikipedia.org/wiki/Zhuangzi_(book)", target: "_blank" },
          "Who is Zhuangzi?"
        )
      )
    );
  };

  return Machine;
}(React.Component);

;

var QuoteBox = function (_React$Component3) {
  _inherits(QuoteBox, _React$Component3);

  function QuoteBox() {
    _classCallCheck(this, QuoteBox);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  QuoteBox.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "Machine__child quoteBox" },
      React.createElement(Quote, { currentQuote: this.props.currentQuote }),
      React.createElement(QuoteAttr, null)
    );
  };

  return QuoteBox;
}(React.Component);

;

var Quote = function (_React$Component4) {
  _inherits(Quote, _React$Component4);

  function Quote() {
    _classCallCheck(this, Quote);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Quote.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        null,
        this.props.currentQuote
      )
    );
  };

  return Quote;
}(React.Component);

;

var QuoteAttr = function QuoteAttr(props) {
  return React.createElement(
    "p",
    null,
    "--Zhuangzi"
  );
};

var TwitterButton = function (_React$Component5) {
  _inherits(TwitterButton, _React$Component5);

  function TwitterButton() {
    _classCallCheck(this, TwitterButton);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  TwitterButton.prototype.tweet = function tweet(e) {
    var text = this.props.currentQuote.split(" ").join("%20").split(";").join("%3B");
    window.open('https://twitter.com/intent/tweet?text=' + text);
  };

  TwitterButton.prototype.render = function render() {
    var _this6 = this;

    return React.createElement(
      "div",
      null,
      React.createElement("button", {
        onClick: function onClick(e) {
          return _this6.tweet(e);
        },
        className: "fa fa-twitter btn btn-info"
      })
    );
  };

  return TwitterButton;
}(React.Component);

;

var NewQuoteButton = function (_React$Component6) {
  _inherits(NewQuoteButton, _React$Component6);

  function NewQuoteButton() {
    _classCallCheck(this, NewQuoteButton);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  NewQuoteButton.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        {
          onClick: this.props.clickHandler,
          className: "btn btn-info"
        },
        "New Quote"
      )
    );
  };

  return NewQuoteButton;
}(React.Component);

;

var quoteList = ["Great understanding is broad and unhurried; little understanding is cramped and busy.", "There is a not yet beginning to be a not yet beginning to be a beginning.", "Your life has a limit but knowledge has none. If you use what is limited to pursue what has no limit, you will be in danger.", "If you do good, stay away from fame. If you do evil, stay away from punishments.", "All men know the use of the useful, but nobody knows the use of the useless!", "Embody to the fullest what has no end and wander where there is no trail.", "Hold on to all that you have received from Heaven by do not think you have gotten anything. Be empty, that is all.", "Do not be an embodier of fame; do not be a storehouse of schemes; do not be an undertaker of projects; do not be a proprietor of wisdom.", "The Perfect Man uses his mind like a mirror--going after nothing, welcoming nothing, responding but not storing.", "A man has to understand the useless before you can talk to him about the useful.", "Where can I find a man who has forgotten words so I can have a word with him?"];

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));