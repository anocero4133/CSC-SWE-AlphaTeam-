import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import CoordinatorAppNavBar from './CoordinatorAppNavBar';
class listTutor extends Component{
    render () { 
        return (
            <div>
                <CoordinatorAppNavBar />
                
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
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default withRouter (listTutor);