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

var _phoenix = require('phoenix');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

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

    _this.handleMessageSubmit = _this.handleMessageSubmit.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = {
      isOpen: false,
      input: "",
      messages: []
    };
    _this.toggleChat = _this.toggleChat.bind(_this);
    _this.configureChannels = _this.configureChannels.bind(_this);
    return _this;
  }

  _createClass(PhoenixChat, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!localStorage.phoenix_chat_uuid) {
        localStorage.phoenix_chat_uuid = _uuid2.default.v4();
      }

      this.uuid = localStorage.phoenix_chat_uuid;
      var params = { uuid: this.uuid };
      this.socket = new _phoenix.Socket("ws://localhost:4000/socket", { params: params });
      this.socket.connect();

      this.configureChannels(this.uuid);
    }
  }, {
    key: 'configureChannels',
    value: function configureChannels(room) {
      var _this2 = this;

      this.channel = this.socket.channel('room:' + room);
      this.channel.join().receive("ok", function (_ref) {
        var messages = _ref.messages;

        console.log('Succesfully joined the ' + room + ' chat room.');
        _this2.setState({
          messages: messages || []
        });
      }).receive("error", function () {
        console.log('Unable to join the ' + room + ' chat room.');
      });
      this.channel.on("message", function (payload) {
        _this2.setState({
          messages: _this2.state.messages.concat([payload])
        });
      });
      this.adminChannel = this.socket.channel('admin:active_users');
      this.adminChannel.join().receive("ok", function () {
        console.log('Succesfully joined the active_users topic.');
      });
    }
  }, {
    key: 'toggleChat',
    value: function toggleChat() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'handleMessageSubmit',
    value: function handleMessageSubmit(e) {
      if (e.keyCode === 13) {
        this.channel.push('message', {
          room: localStorage.phoenix_chat_uuid,
          body: this.state.input,
          timestamp: new Date().getTime()
        });
        this.setState({ input: "" });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ input: e.target.value });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.channel.leave();
      this.adminChannel.leave();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.isOpen ? _react2.default.createElement(PhoenixChatSidebar, {
          handleChange: this.handleChange,
          handleMessageSubmit: this.handleMessageSubmit,
          input: this.state.input,
          messages: this.state.messages,
          toggleChat: this.toggleChat }) : _react2.default.createElement(PhoenixChatButton, { toggleChat: this.toggleChat })
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

    var _this4 = _possibleConstructorReturn(this, (PhoenixChatSidebar.__proto__ || Object.getPrototypeOf(PhoenixChatSidebar)).call(this, props));

    _this4.closeChat = _this4.closeChat.bind(_this4);
    // this.state = {
    //   messages: [
    //     {from: "Client", body: "Test", id: 1},
    //     {from: "John", body: "Foo", id: 2},
    //     {from: "Client", body: "Bar", id: 3}
    //   ]
    // }
    return _this4;
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
      var _this5 = this;

      var list = !this.props.messages ? null : this.props.messages.map(function (_ref2, i) {
        var body = _ref2.body;
        var id = _ref2.id;
        var from = _ref2.from;

        var right = from === localStorage.phoenix_chat_uuid;
        return _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref3) {
              return _this5['chatMessage:' + i] = _ref3;
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
            ref: function ref(_ref4) {
              return _this5.chatContainer = _ref4;
            },
            style: _style2.default.chatContainer },
          list
        ),
        _react2.default.createElement(
          'div',
          { style: _style2.default.inputContainer },
          _react2.default.createElement('input', {
            onKeyDown: this.props.handleMessageSubmit,
            onChange: this.props.handleChange,
            value: this.props.input,
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