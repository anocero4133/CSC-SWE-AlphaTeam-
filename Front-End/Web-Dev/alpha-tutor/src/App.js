import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Student from './Component/student';
import Coordinator from './Component/coordinator';
class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/student" exact={true} component={Student}/>
            <Route path="/coordinator" exact={true} component={Coordinator}/>
          </Switch>


      </Router>
    );
  }
}

export default App;
