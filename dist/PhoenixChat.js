'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoenixChatSidebar = exports.PhoenixChatButton = exports.PhoenixChat = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style.js');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export class PhoenixChat extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <div
//         style={style.chatButton}>
//         <img
//           src="https://github.com/LearnPhoenix/graphics/blob/master/phoenix-chat-icon.png?raw=true"
//           style={style.chatImage} />
//       </div>
//     )
//   }
// }
var PhoenixChat = exports.PhoenixChat = function (_React$Component) {
  _inherits(PhoenixChat, _React$Component);

  function PhoenixChat(props) {
    _classCallCheck(this, PhoenixChat);

    var _this = _possibleConstructorReturn(this, (PhoenixChat.__proto__ || Object.getPrototypeOf(PhoenixChat)).call(this, props));

    _this.state = {
      isOpen: false
    };
    _this.toggleChat = _this.toggleChat.bind(_this);
    return _this;
  }

  _createClass(PhoenixChat, [{
    key: 'toggleChat',
    value: function toggleChat() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.isOpen ? _react2.default.createElement(PhoenixChatSidebar, { toggleChat: this.toggleChat }) : _react2.default.createElement(PhoenixChatButton, { toggleChat: this.toggleChat })
      );
    }
  }]);

  return PhoenixChat;
}(_react2.default.Component);

var PhoenixChatButton = exports.PhoenixChatButton = function (_React$Component2) {
  _inherits(PhoenixChatButton, _React$Component2);

  function PhoenixChatButton() {
    _classCallCheck(this, PhoenixChatButton);

    return _possibleConstructorReturn(this, (PhoenixChatButton.__proto__ || Object.getPrototypeOf(PhoenixChatButton)).apply(this, arguments));
  }

  _createClass(PhoenixChatButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          onClick: this.props.toggleChat,
          style: _style2.default.chatButton },
        _react2.default.createElement('img', {
          src: 'https://github.com/LearnPhoenix/graphics/blob/master/phoenix-chat-icon.png?raw=true',
          style: _style2.default.chatImage })
      );
    }
  }]);

  return PhoenixChatButton;
}(_react2.default.Component);

var PhoenixChatSidebar = exports.PhoenixChatSidebar = function (_React$Component3) {
  _inherits(PhoenixChatSidebar, _React$Component3);

  function PhoenixChatSidebar(props) {
    _classCallCheck(this, PhoenixChatSidebar);

    var _this3 = _possibleConstructorReturn(this, (PhoenixChatSidebar.__proto__ || Object.getPrototypeOf(PhoenixChatSidebar)).call(this, props));

    _this3.closeChat = _this3.closeChat.bind(_this3);
    _this3.state = {
      messages: [{ from: "Client", body: "Test", id: 1 }, { from: "John", body: "Foo", id: 2 }, { from: "Client", body: "Bar", id: 3 }]
    };
    return _this3;
  }

  _createClass(PhoenixChatSidebar, [{
    key: 'closeChat',
    value: function closeChat() {
      this.props.toggleChat();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.messages.length > 0) {
        var lastMessage = this['chatMessage:' + (this.props.messages.length - 1)];
        this.chatContainer.scrollTop = lastMessage.offsetTop;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var list = !this.state.messages ? null : this.state.messages.map(function (_ref, i) {
        var body = _ref.body;
        var id = _ref.id;
        var from = _ref.from;

        var right = from === localStorage.phoenix_chat_uuid;

        return _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref2) {
              _this4['chatMessage:' + i] = _ref2;
            },
            key: i,
            style: _extends({}, _style2.default.messageWrapper, { justifyContent: right ? "flex-end" : "flex-start" }) },
          _react2.default.createElement(
            'div',
            {
              style: right ? _style2.default.chatRight : _style2.default.chatLeft },
            body
          )
        );
      });
      return _react2.default.createElement(
        'div',
        { style: _style2.default.client },
        _react2.default.createElement(
          'div',
          { style: _style2.default.header },
          'PhoenixChat',
          _react2.default.createElement(
            'div',
            { onClick: this.closeChat },
            'Close'
          )
        ),
        _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref3) {
              return _this4.chatContainer = _ref3;
            },
            style: _style2.default.chatContainer },
          list
        ),
        _react2.default.createElement(
          'div',
          { style: _style2.default.inputContainer },
          _react2.default.createElement('input', {
            type: 'text',
            style: _style2.default.inputBox }),
          _react2.default.createElement(
            'div',
            null,
            '100% free by ',
            _react2.default.createElement(
              'a',
              { href: 'learnphoenix.io' },
              'PhoenixChat'
            )
          )
        )
      );
    }
  }]);

  return PhoenixChatSidebar;
}(_react2.default.Component);

exports.default = PhoenixChat;