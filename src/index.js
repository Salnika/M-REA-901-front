import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'; 
import { BrowserRouter as Router, Route, Switch, Prio } from 'react-router-dom';
import { Redirect } from 'react-router';

import DrawingBoard from './components/drawingBoard'; 
import websocket from './components/websocket'

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       Authentication.getToken() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={DrawingBoard} />
      <Route exact path='/socket' component={websocket} />
    </div>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
