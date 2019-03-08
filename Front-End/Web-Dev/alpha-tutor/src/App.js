import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Student from './Component/Student/student';
import Coordinator from './Component/Coordinator/coordinatorMainPage';
import ViewSchedule from './Component/Student/viewSchedule';
import Login from './Component/Authentication/login';
class App extends Component {
  
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/student" exact={true} component={Student}/>
            <Route path="/coordinator" exact={true} component={Coordinator}/>
            <Route path="/student/viewSchedule" exact={true} component={ViewSchedule}/>
            <Route path="/"  exact={true} component={Login}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
