import React from 'react'
import style from './style.js'

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
export class PhoenixChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggleChat = this.toggleChat.bind(this)
  }

  toggleChat() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div>
        { this.state.isOpen
          ? <PhoenixChatSidebar toggleChat={this.toggleChat} />
          : <PhoenixChatButton toggleChat={this.toggleChat} /> }
      </div>
    )
  }
}

export class PhoenixChatButton extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.toggleChat}
        style={style.chatButton}>
        <img
          src="https://github.com/LearnPhoenix/graphics/blob/master/phoenix-chat-icon.png?raw=true"
          style={style.chatImage} />
      </div>
    )
  }
}

export class PhoenixChatSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.closeChat = this.closeChat.bind(this)
    this.state = {
      messages: [
        {from: "Client", body: "Test", id: 1},
        {from: "John", body: "Foo", id: 2},
        {from: "Client", body: "Bar", id: 3}
      ]
    }
  }

  closeChat() {
    this.props.toggleChat()
  }

  componentDidUpdate() {
    if (this.props.messages.length > 0) {
      const lastMessage = this[`chatMessage:${this.props.messages.length - 1}`]
      this.chatContainer.scrollTop = lastMessage.offsetTop
    }
  }

  render() {
    const list = !this.state.messages ? null : this.state.messages.map(({ body, id, from }, i) => {
      const right = from === localStorage.phoenix_chat_uuid

      return (
        <div
          ref={ ref => { this[`chatMessage:${i}`] = ref }}
          key={i}
          style={{...style.messageWrapper, justifyContent: right ? "flex-end" : "flex-start"}}>
          <div
            style={right ? style.chatRight : style.chatLeft}>
            { body }
          </div>
        </div>
      )
    })
    return (
      <div style={style.client}>
        <div style={style.header}>
          PhoenixChat
          <div onClick={this.closeChat}>
            Close
          </div>
        </div>
        <div
          ref={ref => this.chatContainer = ref}
          style={style.chatContainer}>
          { list }
        </div>
        <div style={style.inputContainer}>
          <input
            type="text"
            style={style.inputBox} />
          <div>
            100% free by <a href="learnphoenix.io">PhoenixChat</a>
          </div>
        </div>
      </div>
    )
  }
}

export default PhoenixChat

