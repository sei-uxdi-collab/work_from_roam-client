import React, { Fragment } from 'react'
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import './Header.scss'
import Info from "../Info/Info";
import TopRated from "../TopRated/TopRated";
import MyFavorites from "../MyFavorites/MyFavorites";
import ReviewCard from "../ReviewCard/ReviewCard";

const userBanner = ( user ) => (
  <Fragment>
    <div className="d-flex mb-2" style={{ width: "100%"}}>
      <div>
        <img src="profile-pic-placeholder.png" className="prof-pic" alt="profile pic" />
      </div>
      <div className="ml-4">
        <Row>
          <div className="welcome">Welcome back, {user.email}</div>
        </Row>
        <Row>
            <a href="#change-password" className="change-pw">Change Password</a>
        </Row>
      </div>
    </div>
  </Fragment>
)

const authenticatedOptions = user => (
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
      <MyFavorites user={user} />
    </Row>
    <Row>
      <div>
        <img src="my-reviews-icon.png" className="icon" alt="My Reviews"/>
      </div>
      <div className="list-item">
        <a href="/">My Reviews</a>
      </div>
    </Row>
    <Row>
      <div>
        <img src="top-rated-star-icon.png" className="icon" alt="Top Rated"/>
      </div>
      <TopRated user={user} />
    </Row>
    <Row>
      <div>
        <img src="info-icon.png" className="icon" alt="info"/>
      </div>
      <Info
        title="Info"
        content="This is our app info: It's great! That's all you need to know."
      />
    </Row>
    <div>
      <a className="btn sign-out" href="#sign-out" role="button">Sign Out</a>
    </div>
  </Fragment>
)
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
      <div className="list-item">
        <Info
          title="Info"
          content="This is our app info: It's great! That's all you need to know."
        />
      </div>
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
