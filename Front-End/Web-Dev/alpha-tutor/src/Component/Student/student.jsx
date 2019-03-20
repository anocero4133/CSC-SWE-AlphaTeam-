import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentAppNavBar from './StudentAppNavBar';
class Student extends Component{
    render() {
      return (
        <StudentAppNavBar/>
      );
    }
}

export default withRouter(Student);
