import React, { Fragment } from 'react'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'


import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <a href="/"> Your Favorites</a><br/>
    <a href="/"> My Reviews</a><br/>
    <a href="/"> Top Rated</a><br/>
    <a href="/"> Info</a><br/>
    <a href="#change-password">Change Password</a>
    <br />
    <a href="#sign-out">Sign Out</a>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <a href="#sign-up">Sign Up</a><br/>
    <a href="#sign-in">Sign In</a><br/>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <a href="#/">Home</a><br />
    <a href="/"> Info</a><br/>
  </Fragment>
)

const Header = ({ user }) => (
  <div className="header" collapseOnSelect fixed="top">
    <div>
      { user && <span style={{ color: 'black' }} className="">Welcome, {user.email}</span>}
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
