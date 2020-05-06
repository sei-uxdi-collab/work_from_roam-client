import React, { useState, useRef } from "react";
import { Row, Col } from 'react-bootstrap';
import { StarRating } from '../Review/StarsRating'
import "./MyReviews.scss";

function MyReviews(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);

  // encounter.date_of_encounter = new Date(encounter.date_of_encounter).toLocaleDateString()

  function toggleView() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  // function getDate(date) {
  //   date = new Date(date).toLocaleDateString('en-US');
  //  }

  console.log(props)

  const myReviewsJsx = props.user.reviews.map(review => (
    <li
      key={review.id}
      action
      href={`#workplace/${review.id}`}
    >
    <div className="my-reviews-card">
      <div className="card-content">
        <Row>
          <Col xs={7}>
            <div className="workplace-title"> {review.work_space.name}</div>
          </Col>
          <Col>
            <div className="my-reviews-stars">
              <StarRating
               value={review.rating}
               emptyStarColor='#FFFFFF'
               editing={false}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <span className="plain-text address"> {review.work_space.address} </span>
        </Row>
        <Row>
          <span className=" mt-2 mb-2 plain-text note"> {review.note} </span>
        </Row>
        <Row>
          <span className="date-created"> <img className="created-at-icon" src="created-at-icon.svg" alt="created date"/> {review.user.created_at} </span>
        </Row>
      </div>
    </div>
    </li>
  ))

  return (
    <div className="my-reviews-section"  onClick={toggleView}>
      <div className={`my-reviews  my-reviews-title ${setActive}`}>
        My Reviews
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="my-reviews-content"
      >
      <ul>
        {myReviewsJsx}
      </ul>
      </div>
    </div>
  );
}

export default MyReviews;
