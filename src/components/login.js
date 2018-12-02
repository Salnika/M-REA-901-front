import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './login.css';
import Users from '../services/users';
import Authentication from '../services/authentication';

const style = {
  margin: 15,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  async handleLogin() {
    Users.login(this.state.email, this.state.password)
      .then((resp) => {
        if (resp.status === 200) {
          Authentication.save(resp.data);
          this.setState({ logged: true });
        } else {
          alert('Wrong credentials');
        }
      })
      .catch(() => alert('Wrong credentials'));
  }

  render() {
    if (this.state.logged) {
      return <Redirect to="/channels" />;
    }
    return (
      <div className="login">
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <br />
            <Link to="/register">No account ? Please register</Link>
            <br />
            <RaisedButton label="Submit" primary style={style} onClick={this.handleLogin} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Login;
