import React from 'react';
import io from 'socket.io-client';
import _ from 'lodash';

class channel extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessageType = this.handleMessageType.bind(this);
    this.sendMessageAction = this.sendMessageAction.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      message: '',
      messagesHistory: [],
      userName: this.props.userName,
      channel: this.props.channel,
    };

    this.socket = io.connect('http://localhost:3020');
    this.socket.emit('register', { userName: this.state.userName });
    this.socket.emit('join', { channel: this.state.channel });
    this.socket.on('message', (message) => {
      const messageList = this.state.messagesHistory;
      messageList.push({ userName: message.userName, message: message.message });
      this.setState({ messageHistory: messageList });
    });
  }

  handleMessageType(e) {
    this.setState({ message: e.target.value });
  }

  sendMessage(message, cb) {
    this.socket.emit('message', { message }, cb);
  }

  sendMessageAction() {
    this.sendMessage(this.state.message, console.log);
    this.setState({ message: '' });
  }

  buildRows(messages) {
    return _.map(messages, (message, index) => (
      <tr key={index}>
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

export default channel;
