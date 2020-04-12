import React, { Fragment } from 'react'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'


import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <a href="#change-password">Change Password</a>
    <br /><br />
    <a href="#sign-out">Sign Out</a>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <a href="#sign-up">Sign Up</a>
    <br /><br />
    <a href="#sign-in">Sign In</a>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <a href="#/">Home</a><br /><br />
  </Fragment>
)

const Header = ({ user }) => (
  <div className="header" fixed="top">
    <div href="#">
      WorkFromRoam
    </div>
    <div>
      { user && <span style={{ color: 'black' }}>Welcome, {user.username}</span>}
    </div>
    <br />
    <div id="">
      <div className="">
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </div>
    </div>
  </div>
)

export default Header
