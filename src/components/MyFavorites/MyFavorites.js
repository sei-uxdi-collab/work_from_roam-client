import React, { useRef } from "react";
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import Button from 'react-bootstrap/Button'
import { StarRating } from '../Review/StarsRating'
import { calculateDistanceMiles } from '../../helpers/calculateDistance.js'


import "./MyFavorites.scss";

function MyFavorites(props) {
  const { user, userLocation, isExpanded, toggleExpand } = props
  const content = useRef(null);
  const maxHeight = isExpanded ? `${content.current.scrollHeight}px` : "0px"

  // function to change the telephone number from a string with parenthesis and dashes to ONLY numbers
  const formatPhone = function(phone) {
    return "tel:" + phone.replace(/[ ()\\s-]+/g, "")
  }

  // used for figuring out calculated distance
  const workplaceLocation = function(workplace) {
    return {
      lat: workplace.lat,
      lng: workplace.lng
    }
  }

  const myFavoritesJsx = user.find_up_voted_items.map(workplace => (
    <li
      key={workplace.id}
      action
      href={`#workspace/${workplace.id}`}
    >
    <div className="my-favorite-card">
      <div className="card-content">
        <Row>
          <Col xs={7}>
            <div className="workplace-title"> {workplace.name}</div>
          </Col>
          <Col>
            <div className="my-favorite-stars">
              <StarRating
               value={workplace.avgrating}
               emptyStarColor='#FFFFFF'
               editing={false}
              />
            </div>
          </Col>
          <Col>
              <img src='favoriteHeartRed.svg' alt='favorited' className="heart"/>
          </Col>
        </Row>
        <Row>
          <div className="open-now">Open Now</div>
          <span className="plain-text distance">{calculateDistanceMiles( userLocation, workplaceLocation(workplace) )} miles away</span>
        </Row>
        <Row>
          <span className="plain-text address"> {workplace.address}</span>
        </Row>
        <Row>
          <span className="plain-text phone"> Phone: {workplace.phone ? <u><a href={formatPhone(workplace.phone)}>{workplace.phone}</a></u> : "Not Available"}</span>
        </Row>
        <Row>
          <span className="plain-text bars"> Wifi Quality: {workplace.avgwifi} </span>
        </Row>
        <Row>
          <span className="plain-text bars"> Seat Comfort: {workplace.avgseating} </span>
        </Row>
        <Row>
          <span className="plain-text bars"> Noise Level: {workplace.avgnoise} </span>
        </Row>
      </div>
    </div>
    </li>
  ))

  return (
    <div className="myfavorites-section"  onClick={toggleExpand}>
      <div className={`myfavorites myfavorites-title ${isExpanded ? 'active' : ''}`}>
        My Favorites
      </div>
      <div
        ref={content}
        style={{ maxHeight }}
        className="myfavorites-content"
      >
      <ul>
        {myFavoritesJsx}
      </ul>
      </div>
    </div>
  );
}

export default MyFavorites;
