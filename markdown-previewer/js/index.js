"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props, context) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.state = {
      text: "**Markdown Previewer**\n=======\n### Created by Andrew Horn\n------------\nHeading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nUnranked list:\n\n  * Zhuangzi\n  * James P. Carse\n  * Martin Buber\n\nRanked list:\n\n  1. Zhuangzi\n  2. James P. Carse\n  3. Martin Buber\n\nThe rain---not the reign---in\nSpain.\n\n *[James P. Carse](https://en.wikipedia.org/wiki/James_P._Carse)*"
    };
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });
    return _this;
  }

  App.prototype.handleChange = function handleChange(e) {
    this.setState({ text: e.target.value });
  };

  App.prototype.output = function output() {
    var text = this.state.text;
    var rawMarkup = marked(text);
    return { __html: rawMarkup };
  };

  App.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-md-6" },
        React.createElement("textarea", { value: this.state.text, onChange: function onChange(e) {
            return _this2.handleChange(e);
          } })
      ),
      React.createElement(
        "div",
        { className: "col-md-6" },
        React.createElement("span", { dangerouslySetInnerHTML: this.output() })
      )
    );
  };

  return App;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));