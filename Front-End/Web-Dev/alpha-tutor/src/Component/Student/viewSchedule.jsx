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
                tutors: [],
                isSearchTutor: false,
                searchName : ""
        };
        this.listsTutorAvailable = this.listsTutorAvailable.bind(this);
        this.handleIfSearchingEmpty = this.handleIfSearchingEmpty.bind(this);
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
    handleIfSearchingEmpty(callback){
        if (callback === ""){
            this.setState({
                isSearchTutor: false,
                searchName: ""
            })
        }
    }

    listsTutorAvailable(daily) { 
        const groups  = this.state.tutors;
        const isSearchTutor = this.state.isSearchTutor;
        var array = ["10:00 to 10:30", "10:30 to 11:00","11:00 to 11:30", "11:30 to 12:00", "12:00 to 12:30", "12:30 to 13:00", "13:00 to 13:30", "13:30 to 14:00", "14:00 to 14:30", "14:30 to 15:00", "15:00 to 15:30", "15:30 to 16:00", "16:00 to 16:30", "16:30 to 17:00"]
        var listTutorsForMonday = ["", "", "","","","","","","","","","","",""]
        for (var  k = 0; k < groups.length;++k){
            if (isSearchTutor === true){
                console.log(this.state.searchName)
                if (groups[k].name !== this.state.searchName){
                    continue;
                }
            }
                var availabilities =groups[k].availabilities;
                for (var i = 0 ; i < availabilities.length;++i){
                        if (availabilities[i]["daily"] ===daily){
                            
                        var time = availabilities[i]["startTime"] + " to " + availabilities[i]["startEnd"]
                        for (var j = 0; j < array.length ; ++j){
                                if (array[j] === time){
                                    if (listTutorsForMonday[j] === ""){
                                            listTutorsForMonday[j] = groups[k].name
                                    }else {
                                        listTutorsForMonday[j] = listTutorsForMonday[j] + ", " +groups[k].name
                                    }
                                }
                        }
                    }
                }
            }
        return listTutorsForMonday;
    }
    render() {
        const MondayTutors = this.listsTutorAvailable("Monday").map(arr=>{
            return <td>{arr}</td>
        })
        const TuesdayTutors = this.listsTutorAvailable("Tuesday").map(arr=>{
            return <td>{arr}</td>
        })
        const WednesdayTutors = this.listsTutorAvailable("Wednesday").map(arr=>{
            return <td>{arr}</td>
        })
        const ThursdayTutors = this.listsTutorAvailable("Thursday").map(arr=>{
            return <td>{arr}</td>
        })
        const FridayTutors = this.listsTutorAvailable("Friday").map(arr=>{
            return <td>{arr}</td>
        })
        return (
            <div>
            <StudentAppNavBar/>
            
            <ReactSearchBox
        placeholder="Search tutor"
        value="Doe"
        data={this.tutorSearchName}
        onSelect={record => this.setState({isSearchTutor: true, searchName: record['value'] })
        }
        onChange={record => this.handleIfSearchingEmpty(record)}

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
                {TuesdayTutors}
              </tr>
              <tr>
                <td>Wednesday</td>
                {WednesdayTutors}
              </tr> 
              <tr>
                <td>Thursday</td>
                {ThursdayTutors}
              </tr>
              <tr>
                <td>Friday</td>
                {FridayTutors}
              </tr>
            </tbody>
          </Table>    
          </div>
        );

    }
}