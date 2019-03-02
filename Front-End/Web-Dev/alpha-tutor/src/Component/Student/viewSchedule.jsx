import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label , Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentAppNavBar from './StudentAppNavBar';
import ReactSearchBox from 'react-search-box'
const DEVELOPMENT_URL = "http://localhost:8080";
export default class ViewSchedule extends Component{ 
    constructor(props){
        super(props);
        this.state = {
                tutors: []
        };
    }
    possibleTimes = ["10:00 to 10:30", "10:30 to 11:00","11:00 to 11:30", "11:30 to 12:00", "12:00 to 12:30", "12:30 to 13:00", "13:00 to 13:30", "13:30 to 14:00", "14:00 to 14:30", "14:30 to 15:00", "15:00 to 15:30", "15:30 to 16:00", "16:00 to 16:30", "16:30 to 17:00"] 
    tutorSearchName = []
    async fetchAllTutors () { 
        var url = DEVELOPMENT_URL + "/api/tutorCoordinator/tutor/all"
        const response = await fetch(url);
        const body = await response.json();
        var arrTutors = []
        for (var i = 0; i < body.length; ++i) {
            var contact = {
                key: body[i]['firstName'],
                value: body[i]["firstName"] + " "  + body[i]['lastName']
            }
            var tutor = {
                name: contact.value,
                availabilities : body[i]['availabilities']
            }
            this.tutorSearchName.push(contact);
            arrTutors.push(tutor)
        }
        this.setState({
            tutors: [...this.state.tutors, ...arrTutors]
        })
    }
    async componentDidMount() {
        this.fetchAllTutors();
    }
    render() {
        const groups  = this.state.tutors;
        var array = ["10:00 to 10:30", "10:30 to 11:00","11:00 to 11:30", "11:30 to 12:00", "12:00 to 12:30", "12:30 to 13:00", "13:00 to 13:30", "13:30 to 14:00", "14:00 to 14:30", "14:30 to 15:00", "15:00 to 15:30", "15:30 to 16:00", "16:00 to 16:30", "16:30 to 17:00"]
        const schedule = groups.map(arr => {
            var listTutorsForMonday = ["", "", "","","","","","","","","","","",""]
                var availabilities =arr.availabilities;
                
                for (var i = 0 ; i < availabilities.length;++i){
                        if (availabilities[i]["daily"] === "Monday"){
                        var time = availabilities[i]["startTime"] + " to " + availabilities[i]["startEnd"]
                        for (var j = 0; j < array.length ; ++j){
                                if (array[j] === time){
                                    if (listTutorsForMonday[j] === ""){
                                            listTutorsForMonday[j] = arr.name
                                    }else {
                                        listTutorsForMonday[j] = listTutorsForMonday[j] + ", " + arr.name
                                    }
                                }
                        }
                    }
                }
           return listTutorsForMonday;
        })
        var MondayTutorsList = schedule;
        const MondayTutors = array.map(arr =>{
            console.log(arr)
            return <td>"helo"</td>
        })
        return (
            <div>
            <StudentAppNavBar/>
            <div>

            </div>
            
            <ReactSearchBox
        placeholder="Search tutor"
        value="Doe"
        data={this.tutorSearchName}
        onSelect={record => console.log(record)}
      />
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
                {MondayTutors}
              </tr>
              <tr>
                <td>Tuesday</td>
              </tr>
              <tr>
                <td>Wednesday</td>
              </tr> 
              <tr>
                <td>Thursday</td>
              </tr>
              <tr>
                <td>Friday</td>
              </tr>
            </tbody>
          </Table>    
          </div>
        );

    }
}