import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label ,ButtonGroup, Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Swal = require('sweetalert2');
var DEVELOPMENT_URL = "http://localhost:8080"
// var PRODUTION_URL = "https://tutor-service-back-end.herokuapp.com/"
class AddTutor extends Component{
    // Declare the items
    tutor = {
        userName: '',
        password: '', 
        firstName : '',
        lastName: '',
        roles: [],
        email: '',
        availabilities: [],
        courses: []
    };

    // Declare the constructor 
    constructor(props){
        super(props);
        this.state = {
            tutor: this.tutor,
            checkedItems: new Map(),
            coursesSelected : [],
            isCourseLoaded: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAvailability = this.handleChangeAvailability.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCoursesPopUp  = this.handleCoursesPopUp.bind(this)
        this.removeCourseSelected = this.removeCourseSelected.bind(this)
    }
    componentDidMount() {
      document.title = "Add tutor";
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
      }else if (tutor.courses.length < 1){
        swal("Invalid input", "Course not selected", "error");
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

      // insert into the  availability
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
    // Insert into the courses
    var courses = this.state.coursesSelected
    for (var i  = 0 ; i < courses.length; ++i){
          var course = courses[i].split(",");
          var aCourse = {
            "courseCRN": course[0],
            "csCourseName" : course[1]
          }
          tutor.courses.push(aCourse)
    }
    console.log(tutor.courses)
    if (this.validation(tutor) === false){
      return;
    }
      var tutorRole = {
          "description": "CS tutor at GSU",
          "roleName": "Tutor"
      }
      var studentRole = {
        "description": "CS student at GSU",
        "roleName": "Student" 
      }

      tutor.roles.push(tutorRole);
      tutor.roles.push(studentRole)
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
          this.props.history.push('/coordinator');
        }
      }
      );

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

    async handleCoursesPopUp() { 
      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
              'CSC 2510, Theoretical Foundations of Computer Science': 'CSC 2510-Theoretical Foundations of Computer Science',
              'CSC 2720, Data Structures': 'CSC 2720-Data Structures',
              'CSC 3210,Computer Organization & Programming': 'CSC 3210-Computer Organization Programming',
              'CSC 3320,System-Level Programming': 'CSC 3320-System Level Programming'
              
          })
        }, 2000)
      })
      const {value: course} = await Swal.fire({
        title: 'Select course',
        input: 'select',
        inputOptions:inputOptions ,
        inputPlaceholder: 'Select a course',
        showCancelButton: true,
        inputValidator: (value) => {
          return !value && 'You need to choose the course!'
        }
      })
      if (course) {
        if(this.state.coursesSelected.includes(course)){
            return;
        }
        this.setState({
            coursesSelected : [...this.state.coursesSelected, course]
        })
      }
      console.log(this.state.coursesSelected)
    }

    removeCourseSelected(courseName){
      let updatedCoursesSelected = [...this.state.coursesSelected].filter(i => i !== courseName);
      this.setState({ coursesSelected: updatedCoursesSelected })
    }


    render() {
      const { classes } = this.props;

      const title = <h3> Tutor Register</h3>;
      var array = ["10:00 to 10:30", "10:30 to 11:00","11:00 to 11:30", "11:30 to 12:00", "12:00 to 12:30", "12:30 to 13:00", "13:00 to 13:30", "13:30 to 14:00", "14:00 to 14:30", "14:30 to 15:00", "15:00 to 15:30", "15:30 to 16:00", "16:00 to 16:30", "16:30 to 17:00"]
      const checkBoxesForMonday = array.map(arr => {
          return  <td><FormControlLabel control={ <Checkbox checked={this.state.checkedItems.get(arr)} onChange={this.handleChangeAvailability} name={"Monday, " + arr} color="primary" />}/></td>
      })
      const checkBoxesForTuesday = array.map(arr => {
        return  <td><FormControlLabel control={ <Checkbox checked={this.state.checkedItems.get(arr)} onChange={this.handleChangeAvailability} name={"Tuesday, " + arr} color="primary" />}/></td>
      })
      const checkBoxesForWednesday = array.map(arr => {
        return  <td><FormControlLabel control={ <Checkbox checked={this.state.checkedItems.get(arr)} onChange={this.handleChangeAvailability} name={"Wednesday, " + arr} color="primary" />}/></td>
       })
      const checkBoxesForThursday = array.map(arr => {
        return  <td><FormControlLabel control={ <Checkbox checked={this.state.checkedItems.get(arr)} onChange={this.handleChangeAvailability} name={"Thursday, " + arr} color="primary" />}/></td>
        })
      const checkBoxesForFriday = array.map(arr => {
        return  <td><FormControlLabel control={ <Checkbox checked={this.state.checkedItems.get(arr)} onChange={this.handleChangeAvailability} name={"Friday, " + arr} color="primary" />}/></td>
        })
      const courseSelected = this.state.coursesSelected.map(arr=>{
          return (
              <tr>
                <td>{arr}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.removeCourseSelected(arr)}>Delete</Button>
                    </ButtonGroup>
                </td>
              </tr> 
          )
      })
      return <div>
          {/* <CoordinatorAppNavBar/> */}
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
              <div>
              <FormGroup className="col-md-4 mb-3">
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                <td>Courses</td>
                <td>Delete</td>
                </tr>
                {courseSelected}
              </tbody>
              
            </Table>
            <Button onClick={this.handleCoursesPopUp}>
                Add Courses 
            </Button>

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

export default withRouter (AddTutor);