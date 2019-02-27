import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Student extends Component{
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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async  handleSubmit(event) {
        event.preventDefault();
    }
    render() {
      const title = <h3> Student Register</h3>;
  
      return <div>
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
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="email">Email</Label>
                <Input type="email" name="firstname" id="firstname" required
                  onChange={this.handleChange} autoComplete="firstname" />
              </FormGroup>
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

export default withRouter(Student);