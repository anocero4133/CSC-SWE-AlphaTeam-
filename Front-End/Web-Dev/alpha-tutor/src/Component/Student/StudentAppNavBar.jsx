import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class StudentAppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/student/allTutors">See Tutors |</NavbarBrand>
      <NavbarBrand tag={Link} to="/student/viewSchedule">See Schedule |</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>

    </Navbar>;
  }
}
