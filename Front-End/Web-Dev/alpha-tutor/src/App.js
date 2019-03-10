import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Student from './Component/Student/student';
import Coordinator from './Component/Coordinator/coordinatorMainPage';
import ViewSchedule from './Component/Student/viewSchedule';
import Login from './Component/Authentication/login';
import ForgetUsername from './Component/Authentication/forgetUsername';
import ForgetPassword from './Component/Authentication/forgetpassword';
import ResetPassword from './Component/Authentication/resetPassword';
import SignUp from './Component/Authentication/signUp';
class App extends Component {
  
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/student" exact={true} component={Student}/>
            <Route path="/coordinator" exact={true} component={Coordinator}/>
            <Route path="/student/viewSchedule" exact={true} component={ViewSchedule}/>
            <Route path="/"  exact={true} component={Login}/>
            <Route path="/forget/username" exact={true} component={ForgetUsername}/>
            <Route path="/forget/password" exact={true} component={ForgetPassword}/>
            <Route path="/reset/password/:email" exact={true} component={ResetPassword}/>
            <Route path="/signUp/" exact={true} component={SignUp}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
