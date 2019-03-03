import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Loading from './Loading'
import swal from 'sweetalert';
var DEVELOPMENT_URL = "https://tutor-service.herokuapp.com"
export default class ListTutor extends Component{
    constructor(props){
            super(props);
            this.state = {
                groups:[], 
                isLoading: true
            }
    }

    async fetchAllTutors(){
        var url = DEVELOPMENT_URL + "/api/tutorCoordinator/tutor/all"
        const response = await fetch(url);
        const body = await response.json();
        const contacts = [];
        for (var i = 0; i < body.length; ++i) {
            var contact = {
                firstName: body[i]['firstName'],
                lastName: body[i]['lastName'],
                email: body[i]['email'],
                username: body[i]['userName']
            }
            contacts.push(contact);
        }
        this.setState(
            {
                groups: [...this.state.groups, ...contacts],
                isLoading: false
            }
        )
        console.log(this.state.groups);
    }

    async remove(username) {
        const url = DEVELOPMENT_URL + "/api/tutorCoordinator/tutor/" + username;
        await fetch(url, {
            method: 'DELETE'
        }).then(() => {
            let updatedEvents = [...this.state.groups].filter(i => i.username !== username);
            this.setState({ groups: updatedEvents });
            swal(
                'Deleted!',
                'This tutor has been deleted',
                'success'
            )
        });
    }

    async componentDidMount() {
        this.fetchAllTutors();
    }

    render () {
        const { groups, isLoading } = this.state;
        if (isLoading) {
            return <Loading />
        }

        const GroupOfUsers = groups.map(group => {
            return <tr key={group['username']}>
                <td>{group['firstName']}</td>
                <td>{group['lastName']}</td>
                <td>{group['email']}</td>
                <td>{group['username']}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.remove(group['username'])}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
        return (
            <div>
                <Container fluid>
                    <h3> List of current tutor</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">First Name</th>
                                <th width="20%">Last Name</th>
                                <th width="20%">Username</th>
                                <th width="20%">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GroupOfUsers}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
