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
        "h1",
        { className: "title" },
        "Welcome to Wikipedia Viewer"
      ),
      React.createElement(
        "h4",
        { className: "subtitle" },
        "Created by Andrew Horn"
      ),
      React.createElement(RandomArticle, null),
      React.createElement(ArticleSearch, null)
    );
  };

  return App;
}(React.Component);

;

var RandomArticle = function (_React$Component2) {
  _inherits(RandomArticle, _React$Component2);

  function RandomArticle() {
    _classCallCheck(this, RandomArticle);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  RandomArticle.prototype.randomArticle = function randomArticle() {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  };

  RandomArticle.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { className: "btn btn-primary random-button", onClick: this.randomArticle },
        "Click here to see a random article"
      )
    );
  };

  return RandomArticle;
}(React.Component);

;

var ArticleSearch = function (_React$Component3) {
  _inherits(ArticleSearch, _React$Component3);

  function ArticleSearch(props) {
    _classCallCheck(this, ArticleSearch);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      links: []
    };
    return _this3;
  }

  ArticleSearch.prototype.handleSubmit = function handleSubmit(e) {
    var _this4 = this;

    e.preventDefault();
    var searchTerm = e.target.searchTerm.value;
    searchTerm = searchTerm.split(' ').join('%20').split(';').join('%3B');
    var axiosUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&limit=100&namespace=0&format=json';

    axios.get(axiosUrl).then(function (res) {
      var links = res.data;
      _this4.setState({ links: links });
    }).catch(function (error) {
      console.log(error);
    });
  };

  ArticleSearch.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { className: "form", onSubmit: this.handleSubmit.bind(this) },
        React.createElement(
          "label",
          { className: "label" },
          "Or enter something below to search:"
        ),
        React.createElement("input", { className: "form__input", name: "searchTerm", type: "text", placeholder: "Zhuangzi" }),
        React.createElement(
          "button",
          { className: "search-button btn btn-link" },
          "And then click here"
        )
      ),
      React.createElement(ArticleList, { links: this.state.links })
    );
  };

  return ArticleSearch;
}(React.Component);

;

var ArticleList = function (_React$Component4) {
  _inherits(ArticleList, _React$Component4);

  function ArticleList() {
    _classCallCheck(this, ArticleList);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  ArticleList.prototype.renderArticles = function renderArticles() {
    var _this6 = this;

    if (this.props.links.length === 0) {
      return React.createElement("div", null);
    } else {
      return this.props.links[1].map(function (val, i) {
        return React.createElement(Article, { title: _this6.props.links[1][i], blurb: _this6.props.links[2][i], url: _this6.props.links[3][i] });
      });
    }
  };

  ArticleList.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        FlipMove,
        null,
        this.renderArticles()
      )
    );
  };

  return ArticleList;
}(React.Component);

;

var Article = function (_React$Component5) {
  _inherits(Article, _React$Component5);

  function Article() {
    _classCallCheck(this, Article);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  Article.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "links" },
      React.createElement(
        "h4",
        null,
        React.createElement(
          "a",
          { href: this.props.url, target: "_blank" },
          this.props.title
        )
      ),
      React.createElement(
        "p",
        null,
        this.props.blurb
      )
    );
  };

  return Article;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));