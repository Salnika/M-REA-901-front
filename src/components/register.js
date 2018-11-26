import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Users from '../services/users';
import './login.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegisterAction = this.handleRegisterAction.bind(this);
    this.handleGoToLogin = this.handleGoToLogin.bind(this);
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
    };
  }

  async handleRegisterAction() {
    const resp = await Users.create(this.state.email, this.state.password, this.state.username);
    if (resp.status === 200) {
      this.setState({ created: true });
    } else {
      alert('Wrong credentials');
    }
  }

  handleGoToLogin() {
    this.setState({ goTologin: true });
  }

  render() {
    if (this.state.goTologin) {
      return <Redirect to="/login" />;
    }
    if (this.state.created) {
      return (
        <div className="login">
          <MuiThemeProvider>
            <div>
              <AppBar title="Register" />
              Succesfully register !
              <br />
              <RaisedButton
                label="Go to loginPage"
                primary
                style={style}
                onClick={this.handleGoToLogin}
              />
              <br />
            </div>
          </MuiThemeProvider>
        </div>
      );
    }
    return (
      <div className="login">
        <MuiThemeProvider>
          <div>
            <AppBar title="Register" />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="email"
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
            <TextField
              type="password"
              hintText="Retype your Password"
              floatingLabelText="Retype Password"
              onChange={(event, newValue) => this.setState({ repeatPassword: newValue })}
            />
            <br />
            <Link to="/login">Have an account ? Go to login page</Link>
            <br />
            <RaisedButton
              label="Submit"
              primary
              style={style}
              onClick={this.handleRegisterAction}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;
