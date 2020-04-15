import React, { Fragment } from 'react'
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import MyReviews from '../MyReviews/MyReviews';
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import './Header.scss'

const userBanner = ( user ) => (
  <Fragment>
    <div className="d-flex mb-2" style={{ width: "100%"}}>
      <img src="profile-pic-placeholder.png" className="prof-pic" alt="profile pic" />
      <span className="welcome pl-2">Welcome back, {user.email}</span>}
    </div>
  </Fragment>
)

const authenticatedOptions = (user, data) => {
  // const myReviewsData = data.filter(item => item.user.id === user.id)
  const myReviewsData = [];

  return (
    <Fragment>
    <Row>
      <Link to='/' className="p-0">
        <img src="close-x-white.png" className="close-x-white" alt="close"/>
      </Link>
      <div>
        { userBanner(user) }
      </div>
    </Row>
      <Row>
        <div>
          <img src="your-favorites-heart-icon.png" className="icon" alt="Your Favorites"/>
        </div>
        <div className="list-item">
          <a href="/">Your Favorites</a>

        </div>
      </Row>
      <Row>
        <div>
          <img src="my-reviews-icon.png" className="icon" alt="My Reviews"/>
        </div>
        <div className="list-item">
          <a href="/">MyReviews</a>
          <MyReviews myReviewsData={myReviewsData} user={user} allData={data}/>
        </div>
      </Row>
      <Row>
        <div>
          <img src="top-rated-star-icon.png" className="icon" alt="Top Rated"/>
        </div>
        <div className="list-item">
          <a href="/">Top Rated</a>
        </div>
      </Row>
      <Row>
        <div>
          <img src="info-icon.png" className="icon" alt="info"/>
        </div>
        <div className="list-item">
          <a href="/">Info</a>
        </div>
      </Row>
      <Row>
        <div>
          <img src="info-icon.png" className="icon" alt="Change Password"/>
        </div>
        <div className="list-item">
          <a href="#change-password">Change Password</a>
          <a className="btn sign-out" href="#sign-out" role="button">Sign Out</a>
        </div>
      </Row>
    </Fragment>
  );
}
const unauthenticatedOptions = (
  <Fragment>
    <Row>
      <Link to='/' className="p-0">
        <img src="close-x-white.png" className="close-x-white" alt="close"/>
      </Link>
      <div>
        <a className="sign-in" href="#sign-in">Log In</a>
        <a className="sign-up" href="#sign-up">Sign Up</a>
      </div>
    </Row>
    <Row>
    <div>
      <img src="info-icon.png" className="icon" alt="info"/>
    </div>
    <div className="list-item mt-2">
      <a href="/">Info</a>
    </div>
    </Row>
  </Fragment>
)
const Header = ({ user, data }) => (
  <div className="header" collapseOnSelect fixed="top">
    <div id="">
      <div>
        { user ? authenticatedOptions(user, data) : unauthenticatedOptions }
      </div>
    </div>
  </div>
)
export default Header
