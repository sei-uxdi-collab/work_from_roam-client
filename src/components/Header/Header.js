import React, { Fragment } from 'react'
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import './Header.scss'

const userBanner = ( user ) => (
  <Fragment>
    <img src="profile-pic-placeholder.png" className="prof-pic" alt="profile pic" />
    <span style={{ color: 'black' }} className="">Welcome back, {user.email}</span>}
  </Fragment>
)

const authenticatedOptions = user => (
  <Fragment>
  <Row>
    <Link to='/' className="p-0">
      <img src="close-x-white.png" className="icon" alt="close"/>
    </Link>
    <div>
      { userBanner(user) }
    </div>
  </Row>
    <Row>
      <div>
        <img src="your-favorites-heart-icon.png" className="icon" alt="Your Favorites"/>
      </div>
      <div>
        <a href="/">Your Favorites</a>
      </div>
    </Row>
    <Row>
      <div>
        <img src="my-reviews-icon.png" className="icon" alt="My Reviews"/>
      </div>
      <div>
        <a href="/">My Reviews</a>
      </div>
    </Row>
    <Row>
      <div>
        <img src="top-rated-star-icon.png" className="icon" alt="Top Rated"/>
      </div>
      <div>
        <a href="/">Top Rated</a>
      </div>
    </Row>
    <Row>
      <div>
        <img src="info-icon.png" className="icon" alt="info"/>
      </div>
      <div>
        <a href="/">Info</a>
      </div>
    </Row>
    <Row>
      <div>
        <img src="info-icon.png" className="icon" alt="Change Password"/>
      </div>
      <div>
        <a href="#change-password">Change Password</a>
      </div>
      <div>
        <a href="#sign-out">Sign Out</a>
      </div>
    </Row>
  </Fragment>
)
const unauthenticatedOptions = (
  <Fragment>
    <Row>
      <Link to='/' className="p-0">
        <img src="close-x-white.png" className="icon" alt="close"/>
      </Link>
      <a href="#sign-up">Sign Up</a>
      <a href="#sign-in">Sign In</a>
    </Row>
    <Row>
      <img src="info-icon.png" className="icon" alt="info"/> <a href="/">Info</a>
    </Row>
  </Fragment>
)
const Header = ({ user }) => (
  <div className="header" collapseOnSelect fixed="top">
    <div id="">
      <div>
        { user ? authenticatedOptions(user) : unauthenticatedOptions }
      </div>
    </div>
  </div>
)
export default Header
