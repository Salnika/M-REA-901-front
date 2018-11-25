import React from 'react';
import io from 'socket.io-client';
import _ from 'lodash';

class websocket extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessageType = this.handleMessageType.bind(this);
    this.sendMessageAction = this.sendMessageAction.bind(this);
    this.handleChannelChange = this.handleChannelChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
    this.registerUserAction = this.registerUserAction.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      message: '',
      messagesHistory: [],
      userName: '',
      channel: '',
    };

    this.socket = io.connect('http://localhost:3020');
    this.socket.on('message', (message) => {
      console.log('message:', message);
      const messageList = this.state.messagesHistory;
      messageList.push({ userName: message.userName, message: message.message });
      this.setState({ messageHistory: messageList });
    });
  }

  handleMessageType(e) {
    this.setState({ message: e.target.value });
  }

  handleChannelChange(e) {
    this.setState({channel: e.target.value});
  }

  handleUserNameChange(e) {
    this.setState({userName: e.target.value});
  }

  sendMessage(message, cb) {
    this.socket.emit('message', { message: message }, cb);
  }

  sendMessageAction() {
    this.sendMessage(this.state.message, console.log);
    this.setState({ message: '' });
  }

  changeChannel() {
    this.socket.emit('join', {channel: this.state.channel});
  }

  registerUserAction() {
    this.socket.emit('register', {userName: this.state.userName});
  }

  buildRows(messages) {
    return _.map(messages, message => (
      <tr>
        <td>
          {message.userName}
          {' '}
:
          {message.message}
        </td>
      </tr>
    ));
  }

  render() {
    const rows = this.buildRows(this.state.messageHistory);
    return (
      <div>
        <div className="pt-card pt-card-elevation-0">
          <table className="pt-html-table pt-html-table-bordered">
            <tbody>{rows}</tbody>
          </table>
        </div>
        <div>
          Channel:
          <input type="text" onChange={this.handleChannelChange} value={this.state.channel} />
          <button type="button" onClick={this.changeChannel}>
            Submit
          </button>
          <br></br>
          UserName:
          <input type="text" onChange={this.handleUserNameChange} value={this.state.userName} />
          <button type="button" onClick={this.registerUserAction}>
            Register
          </button>
          <br />
          Message:
          <input type="text" onChange={this.handleMessageType} value={this.state.message} />
          <button type="button" onClick={this.sendMessageAction}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default websocket;
