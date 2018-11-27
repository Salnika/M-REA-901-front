import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'; 
import { BrowserRouter as Router, Route, Switch, Prio } from 'react-router-dom';
import { Redirect } from 'react-router';

import Authentication from './services/authentication'
import Register from './components/register';
import Login from './components/login';
import DrawingBoard from './components/drawingBoard'; 
import websocket from './components/channel'
import channelsList from './pages/channels';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Authentication.getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

ReactDOM.render(
  <Router>
    <div>
      <PrivateRoute exact path="/" component={Login} />
      <PrivateRoute exact path="/channels" component={channelsList} />
      <Route path="/login" component={Login} />
      <Route exact path="/register" component={Register}/>
    </div>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
