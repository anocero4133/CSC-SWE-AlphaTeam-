import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import CircularIndeterminate from '../../Utils/Loading'
import swal from 'sweetalert';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

var DEVELOPMENT_URL = "http://localhost:8080"
// var PRODUTION_URL = "https://tutor-service-back-end.herokuapp.com/
 class ListTutor extends Component{
    constructor(props){
            super(props);
            this.state = {
                groups:[], 
                isLoading:  true
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
        document.title = "List of tutors"
        this.fetchAllTutors();
    }

    render () {
        const { groups, isLoading } = this.state;
        if (isLoading) {
            return <CircularIndeterminate />
        }

        const GroupOfUsers = groups.map(group => {
            return <tr key={group['username']}>
                <td>{group['firstName']}</td>
                <td>{group['lastName']}</td>
                <td>{group['email']}</td>
                <td>{group['username']}</td>
                <td>
                    {/* <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.remove(group['username'])}>Delete</Button>
                    </ButtonGroup> */}
                    <IconButton aria-label="Delete"  onClick={() => this.remove(group['username'])}>
                      <DeleteIcon />
                         </IconButton>
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
                                <th width="20%">Email</th>
                                <th width="20%">Username</th>
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
export default withRouter(ListTutor);