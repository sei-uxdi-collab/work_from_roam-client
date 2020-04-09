import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'


import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <Row>
      <Col>
        <Link to='/'>
          <img src="close-x-white.png" className="icon" alt="close"/>
        </Link>
      </Col>
    </Row>
    <Row>
      <img src="your-favorites-heart-icon.png" className="icon" alt="Your Favorites"/> <a href="/">Your Favorites</a>
    </Row>
    <Row>
      <img src="my-reviews-icon.png" className="icon" alt="My Reviews"/> <a href="/">My Reviews</a>
    </Row>
    <Row>
      <img src="top-rated-star-icon.png" className="icon" alt="Top Rated"/> <a href="/">Top Rated</a>
    </Row>
    <Row>
      <img src="info-icon.png" className="icon" alt="info"/> <a href="/">Info</a>
    </Row>
    <Row>
      <img src="info-icon.png" className="icon" alt="Change Password"/> <a href="/">Change Password</a>
      <a href="#sign-out">Sign Out</a>
    </Row>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Row>
      <a href="#sign-up">Sign Up</a>
    </Row>
    <Row>
      <a href="#sign-in">Sign In</a>
    </Row>
    <Row>
      <img src="info-icon.png" className="icon" alt="info"/> <a href="/">Info</a>
    </Row>
  </Fragment>
)

const Header = ({ user }) => (
  <div className="header" collapseOnSelect fixed="top">
    <Row>
      <Col className="p-0">
        <Link to='/'>
          <img src="close-x-white.png" className="icon" alt="close"/>
        </Link>
      </Col>
      <Col>
        { user && <span style={{ color: 'black' }} className="">Welcome, {user.email}</span>}
      </Col>
    </Row>
    <br />
    <div id="">
      <div className="">
        { user ? authenticatedOptions : unauthenticatedOptions }
      </div>
    </div>
  </div>
)

export default Header
