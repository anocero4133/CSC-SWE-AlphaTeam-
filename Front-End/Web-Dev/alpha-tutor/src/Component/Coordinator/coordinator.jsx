import React, { Component  } from 'react';
import CoordinatorAppNavBar from './CoordinatorAppNavBar.jsx'
import ListTutor from '../../Utils/listTutor';
class Coordinator extends Component{
    render() {
        return (
            <div>
            <CoordinatorAppNavBar/>
            <ListTutor/>
            </div>
        );
    }
}
export default Coordinator;