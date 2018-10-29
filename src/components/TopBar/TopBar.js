import React, { Component } from 'react';
import classes from './TopBar.css';
import { Nav, NavItem, MenuItem, NavDropdown, Navbar, } from 'react-bootstrap'
import {NavLink} from 'react-router-dom';


const style = {
  color: 'white',
}
export default class TopBar extends Component {

  state = {
    key: 1
  };


  toggleNavbar = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  handleSelect = (key) => {
    this.setState({key});
  }
  
  render() {
    return (
      <div >
      <Navbar style={{marginBottom: "-15px",}} className={classes.Navbar} inverse collapseOnSelect>
          <Navbar.Header >
            <Navbar.Brand>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className={classes.Nav} >
              <NavItem eventKey={1} href="#">
                <NavLink style={style} to="/home">HOME</NavLink>
              </NavItem>
              <NavItem eventKey={2} href="#">
                <NavLink style={style} to="/voters">VOTERS</NavLink>
              </NavItem>
              <NavItem eventKey={3} href="#">
                <NavLink style={style} to="/reports">REPORTS</NavLink>
              </NavItem>
              <NavItem eventKey={4} href="#">
                <NavLink style={style} to="/">LOGOUT</NavLink>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>;
    </div>
    )
  }
}
