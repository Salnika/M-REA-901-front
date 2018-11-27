import React from 'react';
import PropTypes from 'prop-types';
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
import User from '../services/users.js';

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
    this.state = {
      menu: false,
      channel: 'General',
    };
  }

  toggleDrawer = () => () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  handleChannelChange(e) {
    this.setState({ channel: e.target.textContent });
    this.forceUpdate();
  }

  render() {
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
          <ListItem key={'channels'}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary={'Channels'} />
          </ListItem>
          {['General', 'random', 'Work'].map((text, index) => (
            <ListItem button onClick={this.handleChannelChange} key={index} value={text}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer('menu', true)}>Open menu</Button>
        <h3>Current channel: {this.state.channel}</h3>
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
        <div>
          <Channel userName={localStorage.getItem('user.firstName')} channel={this.state.channel} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ChannelList);
