import React from 'react';
import PropType from 'prop-types';
import io from 'socket.io-client';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './channel.css';

class channel extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessageType = this.handleMessageType.bind(this);
    this.sendMessageAction = this.sendMessageAction.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      message: '',
      messageHistory: [],
      userName: props.userName,
      channel: props.channel,
    };

    this.socket = io.connect('http://localhost:3020');
    this.socket.emit('register', { userName: this.state.userName });
    this.socket.emit('join', { channel: this.state.channel });
    this.socket.on('message', (message) => {
      const messageList = this.state.messageHistory;
      messageList.push({ userName: message.userName, message: message.message });
      this.setState({ messageHistory: messageList });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ channel: nextProps.channel });
    this.setState({ messageHistory: [] });
    this.socket.emit('join', { channel: nextProps.channel });
    console.log(this.state.messageHistory);
  }

  handleMessageType(e) {
    this.setState({ message: e.target.value });
  }

  sendMessage(message) {
    this.socket.emit('message', { message });
  }

  sendMessageAction() {
    this.sendMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    const rows = _.map(this.state.messageHistory, (message, index) => (
      <tr key={index}>
        <td>
          {message.userName}
          {' '}
:
          {message.message}
        </td>
      </tr>
    ));

    return (
      <MuiThemeProvider>
        <div className="chatList">
          <div className="pt-card pt-card-elevation-0">
            <table className="pt-html-table pt-html-table-bordered">
              <tbody>{rows}</tbody>
            </table>
          </div>
          <div className="chatbar">
            <br />
            Message on
            {' '}
            {this.state.channel}
:
            <TextField
              className="chatInput"
              type="text"
              width="80%"
              onChange={this.handleMessageType}
              value={this.state.message}
            />
            <RaisedButton label="Send" onClick={this.sendMessageAction} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

channel.propTypes = {
  userName: PropType.string,
  channel: PropType.string,
};

export default channel;
