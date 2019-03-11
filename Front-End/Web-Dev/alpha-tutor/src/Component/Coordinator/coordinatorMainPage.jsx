import React, { Component  } from 'react';
import SimpleTabs from './CoordinatorAppNavBar.jsx'
class Coordinator extends Component{
   
    render() {
        return (
            <div>
            <SimpleTabs history={this.props.history}/>
            </div>
        );
    }
}
export default Coordinator;