import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label , Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';

import CoordinatorAppNavBar from './CoordinatorAppNavBar';

class AddTutor extends Component{
    // Declare the items
    student = {
        username: '',
        password: '', 
        firstName : '',
        lastName: '',
        email: ''
    };
    // Declare the constructor 
    constructor(props){
        super(props);
        this.state = {
            student: this.student
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let item = { ...this.state.item };
      item[name] = value;
      console.log(value)
      this.setState({ item });
    }

    render() {
      const title = <h3> Tutor Register</h3>;
      var array = ["10:00 to 10:30", "10:30 to 11:00", "11:30 to 12:00", "12:00 to 12:30", "12:30 to 13:00", "13:00 to 13:30", "13:30 to 14:00", "14:00 to 14:30", "14:30 to 15:00", "15:00 to 15:30", "15:30 to 16:00", "16:00 to 16:30", "16:30 to 17:00"]
      const checkBoxes = array.map(arr => {
          return <td key={arr}> <input type="checkbox"/> </td>
      })
      return <div>
          <CoordinatorAppNavBar/>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username" required
                onChange={this.handleChange} autoComplete="username" />
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="password">Password</Label>
              <Input type="text" name="password" id="password" required
                onChange={this.handleChange} autoComplete="password" />
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
                <Label for="email">Email</Label>
                <Input type="email" name="firstname" id="firstname" required
                  onChange={this.handleChange} autoComplete="firstname" />
              </FormGroup>
        </div>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="firstname">First Name</Label>
                <Input type="text" name="firstname" id="firstname" required
                  onChange={this.handleChange} autoComplete="firstname" />
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="lastname">Last Name</Label>
                <Input type="text" name="lastname" id="lastname" required
                  onChange={this.handleChange} autoComplete="lastname" />
              </FormGroup>
            </div>
            <div>
            <Table striped bordered hover size="sm">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>10:00 to 10:30</th>
                                      <th>10:30 to 11:00</th>
                                      <th>11:00 to 11:30</th>
                                      <th>11:30 to 12:00</th>
                                      <th>12:00 to 12:30</th>
                                      <th>12:30 to 13:30</th>
                                      <th>13:30 to 14:00</th>
                                      <th>14:00 to 14:30</th>
                                      <th>14:30 to 15:00</th>
                                      <th>15:00 to 15:30</th>
                                      <th>15:30 to 16:00</th>
                                      <th>16:00 to 16:30</th>
                                      <th>16:30 to 17:00</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Monday</td>
                                      {checkBoxes} 
                                    </tr>
                                    <tr>
                                      <td>Tuesday</td>
                                      {checkBoxes}  
                                    </tr>
                                    <tr>
                                      <td>Wednesday</td>
                                      {checkBoxes} 
                                    </tr> 
                                    <tr>
                                      <td>Thursday</td>
                                      {checkBoxes}  
                                    </tr>
                                    <tr>
                                      <td>Friday</td>
                                      {checkBoxes}  
                                    </tr>
                                  </tbody>
                                </Table>
              </div>
            <FormGroup className="col-md-4 mb-3">
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    }
}

export default withRouter(AddTutor);