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
import NotAllowed from './Component/Others/NotAllowed';
import {ProtectedRoute} from './Component/Authentication/protected.route';
import {PreLogInAuth} from './Component/Authentication/PreLogInAuth';
import TutorMainPage from './Component/Tutor/TutorMainPage';
class App extends Component {

  render() {
    return (
      <Router>
          <Switch>
            <ProtectedRoute path="/student" exact component={Student}/>
            <ProtectedRoute path="/coordinator"  component={Coordinator}/>
            <ProtectedRoute path="/tutor"  exact={true} component={TutorMainPage}/>
            <PreLogInAuth path="/"  exact={true} component={Login}/>
            <Route path="/forget/username" exact={true} component={ForgetUsername}/>
            <Route path="/forget/password" exact={true} component={ForgetPassword}/>
            <Route path="/reset/password/:email" exact={true} component={ResetPassword}/>
            <Route path="/signUp/" exact={true} component={SignUp}/>
            <Route path="/error/" exact={true} component={NotAllowed}/>
            <Route path="*" component={()=> "404 NOT FOUND"}/>
          </Switch>
          </Router>
    );
  }
}

export default App;
