import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Student from './Component/student';
import Coordinator from './Component/coordinator';
import listTutor from './Component/listTutor';
import addTutor from './Component/addTutor';
class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/student" exact={true} component={Student}/>
            <Route path="/coordinator" exact={true} component={Coordinator}/>
            <Route path="/coordinator/listTutor" exact={true} component={listTutor}/>
            <Route path="/coordinator/addTutor" exact={true} component={addTutor}/>
          </Switch>


      </Router>
    );
  }
}

export default App;
