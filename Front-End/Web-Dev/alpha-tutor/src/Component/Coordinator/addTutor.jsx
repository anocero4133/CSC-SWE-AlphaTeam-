import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label , Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoordinatorAppNavBar from './CoordinatorAppNavBar';
import swal from 'sweetalert';
import DEVELOPMENT_URL from '../../Utils/DeploymentUrl'
// const DEVELOPMENT_URL = "http://localhost:8080/api/tutorCoordinator/tutor";
class AddTutor extends Component{
    // Declare the items
    tutor = {
        userName: '',
        password: '', 
        firstName : '',
        lastName: '',
        roles: [],
        email: '',
        availabilities: []
    };

    // Declare the constructor 
    constructor(props){
        super(props);
        this.state = {
            tutor: this.tutor,
            checkedItems: new Map()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAvailability = this.handleChangeAvailability.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validation(tutor){
      if (tutor.firstName.length < 3 || tutor.firstName > 20){
        swal("Invalid input", "First name size from 3 to 20", "error");
        return false;
      }else if (tutor.lastName.length < 3 || tutor.lastName > 20){
        swal("Invalid input", "Last name size from 3 to 20", "error");
        return false;
      }else if (tutor.password.length < 8){
        swal("Invalid input", "Minimum password length: 8 characters", "error");
        return false;
      }else if (tutor.availabilities.length < 1){
        swal("Invalid input", tutor.firstName + " has no schedule at this point", "error");
        return false
      }else if (tutor.availabilities.length > 20 ){
        swal("Invalid input", tutor.firstName + " has exceed 10 hours of work", "error");
        return false
      }
      return true;
    }

    async handleSubmit(event){
      //{username: "ds", password: "ssdad", firstname: "sdadsad", lastname: "dadsda"}
      event.preventDefault(); 
      const { item } = this.state;
      var tutor = this.state.tutor ;
      tutor.userName = item["username"];
      tutor.password = item["password"];
      tutor.firstName = item["firstname"];
      tutor.lastName = item["lastname"];
      tutor.email = item["email"];
   
      var checkItems = this.state.checkedItems;
      for (let [k, v] of checkItems) {
        if (v === true){
            var res = k.split(",");
            var time = res[1].replace("to","").split(" ")
            var availability = 
            {
              daily: res[0],
              startEnd: time[3] ,
              startTime: time[1]
            } 
            tutor.availabilities.push(availability) 
        }
    }
    if (this.validation(tutor) === false){
      return;
    }
      var role = {
          "description": "CS tutor at GSU",
          "roleName": "Tutor"
      }
      tutor.roles.push(role);
      var body = JSON.stringify(tutor);
      var url = DEVELOPMENT_URL + "/api/tutorCoordinator/tutor";
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        var errorCodes = [400, 401, 402, 403]
        console.log(response)
        if (errorCodes.includes(response['status']) ) {
          swal("Error", "Tutor is registered", "error");

        } else {
          swal("Great! Tutor is saved");
          tutor.availabilities = [] 
          this.props.history.push('/coordinator/addTutor');
        }
      }
      );
        console.log(body);

    }
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let item = { ...this.state.item };
      item[name] = value;
      this.setState({ item });
    }
    handleChangeAvailability(event){ 
      const item = event.target.name;
    const isChecked = event.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }), () => console.log(this.state.checkedItems));
    }

    render() {
      const title = <h3> Tutor Register</h3>;
      var array = ["10:00 to 10:30", "10:30 to 11:00","11:00 to 11:30", "11:30 to 12:00", "12:00 to 12:30", "12:30 to 13:00", "13:00 to 13:30", "13:30 to 14:00", "14:00 to 14:30", "14:30 to 15:00", "15:00 to 15:30", "15:30 to 16:00", "16:00 to 16:30", "16:30 to 17:00"]
      const checkBoxesForMonday = array.map(arr => {
          return <td > <input type="checkbox" name={"Monday, " + arr} checked={this.state.checkedItems.get(arr)} onChange={this.handleChangeAvailability}/> </td>
      })
      const checkBoxesForTuesday = array.map(arr => {
          return <td > <input name={"Tuesday, " + arr} checked={this.state.checkedItems.get(arr)} type="checkbox" onChange={this.handleChangeAvailability}/> </td>
      })
      const checkBoxesForWednesday = array.map(arr => {
        return <td > <input name={"Wednesday, " + arr} checked={this.state.checkedItems.get(arr)} type="checkbox" onChange={this.handleChangeAvailability}/> </td>      })
      const checkBoxesForThursday = array.map(arr => {
        return <td > <input name={"Thursday, " + arr} checked={this.state.checkedItems.get(arr)} type="checkbox" onChange={this.handleChangeAvailability}/> </td>      })
      const checkBoxesForFriday = array.map(arr => {
        return <td > <input name={"Friday, " + arr} checked={this.state.checkedItems.get(arr)} type="checkbox" onChange={this.handleChangeAvailability}/> </td>      })

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
                <Input type="email" name="email" id="email" required
                  onChange={this.handleChange} autoComplete="email" />
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
              <FormGroup className="col-md-4 mb-3">
            <Table striped bordered hover size="sm">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>10:00 to 10:30</th>
                                      <th>10:30 to 11:00</th>
                                      <th>11:00 to 11:30</th>
                                      <th>11:30 to 12:00</th>
                                      <th>12:00 to 12:30</th>
                                      <th>12:30 to 13:00</th>
                                      <th>13:00 to 13:30</th>
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
                                      {checkBoxesForMonday} 
                                    </tr>
                                    <tr>
                                      <td>Tuesday</td>
                                      {checkBoxesForTuesday}  
                                    </tr>
                                    <tr>
                                      <td>Wednesday</td>
                                      {checkBoxesForWednesday} 
                                    </tr> 
                                    <tr>
                                      <td>Thursday</td>
                                      {checkBoxesForThursday}  
                                    </tr>
                                    <tr>
                                      <td>Friday</td>
                                      {checkBoxesForFriday}  
                                    </tr>
                                  </tbody>
                                </Table>
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

export default withRouter(AddTutor);