import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AddTutor from './addTutor';
import ListTutor from './listTutor';
import AlignItemsList from '../Others/AboutUs'
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

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    if (value === 7) {
      localStorage.clear();
      const { history } = this.props;
      history.push("/");
    }
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Add Tutor" />
            <Tab label="All Tutors" />
            <Tab label="Support" />
            <Tab disabled={true} />
            <Tab disabled={true}/>
            <Tab disabled={true} />
            <Tab disabled={true} />
            <Tab label="Log out" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><AddTutor /></TabContainer>}
        {value === 1 && <TabContainer><ListTutor /></TabContainer>}
        {value === 2 && <TabContainer><AlignItemsList /></TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
