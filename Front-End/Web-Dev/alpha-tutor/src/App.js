import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Student from './Component/Student/student';
import Coordinator from './Component/Coordinator/coordinator';
import ListTutor from './Utils/listTutor';
import addTutor from './Component/Coordinator/addTutor';
import ViewSchedule from './Component/Student/viewSchedule';
class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/student" exact={true} component={Student}/>
            <Route path="/coordinator" exact={true} component={Coordinator}/>
            <Route path="/coordinator/listTutor" exact={true} component={ListTutor}/>
            <Route path="/coordinator/addTutor" exact={true} component={addTutor}/>
            <Route path="/student/allTutors" exact={true} component={ListTutor}/>
            <Route path="/student/viewSchedule" exact={true} component={ViewSchedule}/>
          </Switch>


      </Router>
    );
  }
}

export default App;
