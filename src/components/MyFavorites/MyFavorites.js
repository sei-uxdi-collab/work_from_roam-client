import React, { useRef } from "react";
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import Button from 'react-bootstrap/Button'
import StarRatingComponent from "react-star-rating-component";
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
          <Col xs={10} className="pl-0">
            <div className="workplace-title"> {workplace.name}</div>
          </Col>
          <Col>
              <img src='favoriteHeartRed.svg' alt='favorited' className="heart"/>
          </Col>
        </Row>
        <Row>
          <span className="plain-text"> {workplace.address}</span>
        </Row>
        <Row>
          <span className="plain-text"> Phone: {workplace.phone ? <u><a href={formatPhone(workplace.phone)}>{workplace.phone}</a></u> : "Not Available"}</span>
        </Row>
        <Row>
          <div className="my-favorite-stars">
            <StarRatingComponent
             value={workplace.avgrating}
             emptyStarColor='#C4D3FF'
             editing={false}
             renderStarIcon={() => <img src="star-icon.svg" className="my-favorite-star" alt="star"/>}
            />
          </div>
        </Row>
        <Row className="pb-2">
          <div className="open-now">Open Now</div>
          <span className="plain-text distance">{calculateDistanceMiles( userLocation, workplaceLocation(workplace) )} miles away</span>
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
