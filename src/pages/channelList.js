import React from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import ListIcon from '@material-ui/icons/List';
import Channel from '../components/channel.js';
import DrawingBoard from '../components/drawingBoard.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Auth from '../services/authentication';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChannelChange = this.handleChannelChange.bind(this);
    this.actionLogout = this.actionLogout.bind(this);
    this.state = {
      menu: false,
      channel: 'General',
      logged: true,
    };
  }

  toggleDrawer = () => () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  handleChannelChange(e) {
    this.setState({ channel: e.target.textContent });
    console.log(this.state.channel);
  }

  actionLogout() {
    console.log('here');
    Auth.logout();
    this.setState({ logged: false });
  }

  render() {
    if (!this.state.logged) {
      return <Redirect to="/login" />;
    }
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key={'close menu'} onClick={this.toggleDrawer}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary={'close menu'} />
          </ListItem>
          <Divider />
          {['General', 'random', 'Work', 'Draw'].map((text, index) => (
            <ListItem button onClick={this.handleChannelChange} key={index} value={text}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button key={'Logout'} onClick={this.actionLogout}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </div>
    );
    let channelDiv = (
      <Channel userName={localStorage.getItem('user.firstName')} channel={this.state.channel} />
    );
    if (this.state.channel === 'Draw') {
      channelDiv = <DrawingBoard />;
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer('menu', true)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {this.state.channel}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.menu} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
        <div>{channelDiv}</div>
      </div>
    );
  }
}

export default withStyles(styles)(ChannelList);
