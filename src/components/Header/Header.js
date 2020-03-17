import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <br /><br />
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <br /><br />
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link><br /><br />
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="header" collapseOnSelect fixed="top" bg="secondary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      WorkFromRoam
    </Navbar.Brand>
    <Nav>
      { user && <span style={{ color: 'black' }} className="navbar-text mr-2">Welcome, {user.email}</span>}
    </Nav>
    <br />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
