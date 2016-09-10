import React from 'react'
import style from './style.js'

import { Socket } from "phoenix"

import uuid from 'uuid'
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
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      isOpen: false,
      input: "",
      messages: []
    }
    this.toggleChat = this.toggleChat.bind(this)
    this.configureChannels = this.configureChannels.bind(this)
  }

  componentDidMount() {
    if (!localStorage.phoenix_chat_uuid) {
      localStorage.phoenix_chat_uuid = uuid.v4()
    }

    this.uuid = localStorage.phoenix_chat_uuid
    const params = { uuid: this.uuid }
    this.socket = new Socket("ws://localhost:4000/socket", { params })
    this.socket.connect()

    this.configureChannels(this.uuid)
  }

  configureChannels(room) {
    this.channel = this.socket.channel(`room:${room}`)
    this.channel.join()
      .receive("ok", ({ messages }) => {
        console.log(`Succesfully joined the ${room} chat room.`)
        this.setState({
          messages: messages || []
        })
      })
      .receive("error", () => {
        console.log(`Unable to join the ${room} chat room.`)
      })
    this.channel.on("message", payload => {
      this.setState({
        messages: this.state.messages.concat([payload])
      })
    })
    this.adminChannel = this.socket.channel(`admin:active_users`)
    this.adminChannel.join()
      .receive("ok", () => {
        console.log(`Succesfully joined the active_users topic.`)
      })
  }

  toggleChat() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleMessageSubmit(e) {
    if (e.keyCode === 13) {
      this.channel.push('message', {
        room: localStorage.phoenix_chat_uuid,
        body: this.state.input,
        timestamp: new Date().getTime()
      })
      this.setState({ input: "" })
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  componentWillUnmount() {
    this.channel.leave()
    this.adminChannel.leave()
  }

  render() {
    return (
      <div>
        { this.state.isOpen
          ? <PhoenixChatSidebar
              handleChange={this.handleChange}
              handleMessageSubmit={this.handleMessageSubmit}
              input={this.state.input}
              messages={this.state.messages}
              toggleChat={this.toggleChat} />
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
    // this.state = {
    //   messages: [
    //     {from: "Client", body: "Test", id: 1},
    //     {from: "John", body: "Foo", id: 2},
    //     {from: "Client", body: "Bar", id: 3}
    //   ]
    // }
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
    const list = !this.props.messages ? null : this.props.messages.map(({ body, id, from }, i) => {
      const right = from === localStorage.phoenix_chat_uuid
      return (
        <div
          ref={ref => this[`chatMessage:${i}`] = ref}
          key={i}
          style={{ ...style.messageWrapper, justifyContent: right ? "flex-end" : "flex-start" }}>
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
            onKeyDown={this.props.handleMessageSubmit}
            onChange={this.props.handleChange}
            value={this.props.input}
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

