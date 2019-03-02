import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
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
