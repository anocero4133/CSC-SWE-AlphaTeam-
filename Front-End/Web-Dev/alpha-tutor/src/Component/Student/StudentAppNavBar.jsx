import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ViewSchedule from './viewSchedule';
import DeploymentUrl from '../../Utils/DeploymentUrl';
var DEVELOPMENT_URL = DeploymentUrl.DEVELOPMENT_URL;
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
  constructor() {
    super();
    this.state = {
      tutors: [],
      value: 0
    }
  }
  handleChange = (event, value) => {
    if (value === 5) {
      localStorage.clear();
      window.location.reload();
    }
    this.setState({ value: value });
  };
  tutorSearchName = []
  async fetchAllTutors() {
    var url = DEVELOPMENT_URL + "/api/tutorCoordinator/tutor/all"
    console.log(url);
    const response = await fetch(url);
    const body = await response.json();
    var arrTutors = []
    for (var i = 0; i < body.length; ++i) {
      var contact = {
        key: body[i]['firstName'],
        value: body[i]["firstName"] + " " + body[i]['lastName']
      }
      var tutor = {
        name: contact.value,
        availabilities: body[i]['availabilities']
      }
      this.tutorSearchName.push(contact);
      arrTutors.push(tutor)
    }
    this.setState({
      tutors: [...this.state.tutors, ...arrTutors]
    })
  }
  async componentDidMount() {
    this.fetchAllTutors();
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ background: '#2E3B55' }}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="View Schedule" />
            <Tab label="" />
            <Tab label="" />
            <Tab label="" />
            <Tab label="Log out" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><ViewSchedule tutors={this.state.tutors} tutorSearchName={this.tutorSearchName}/></TabContainer>}
      </div>
    );
  }
}

StudentAppNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentAppNavBar);