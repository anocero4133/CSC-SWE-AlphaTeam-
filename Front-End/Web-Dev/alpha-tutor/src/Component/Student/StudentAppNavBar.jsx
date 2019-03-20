import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ViewSchedule from './viewSchedule';
import Chat from '../ChatApp/Chat';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class StudentAppNavBar extends React.Component {
  state = {
    value: 0,
  };
 
  handleChange = (event, value) => {
    if (value === 5){
        localStorage.clear();
        window.location.reload();
    }
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static"  style={{ background: '#2E3B55' }}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="View Schedule" />
            {/* <Tab label="Chat With Tutor"/> */}
            <Tab label=""/>
            <Tab label=""/>
            <Tab label=""/>
            <Tab label="Log out"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><ViewSchedule/></TabContainer>}
        {/* {value ===1 && <TabContainer><Chat/></TabContainer>} */}
      </div>
    );
  }
}

StudentAppNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentAppNavBar);