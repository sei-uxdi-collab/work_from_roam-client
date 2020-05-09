import React, { useRef } from "react";
import { Row, Col } from 'react-bootstrap';
import { StarRating } from '../Review/StarsRating'
import "./MyReviews.scss";

function MyReviews(props) {
  const { user, isExpanded, toggleExpand } = props
  const content = useRef(null);
  const maxHeight = isExpanded ? `${content.current.scrollHeight}px` : "0px"

  // encounter.date_of_encounter = new Date(encounter.date_of_encounter).toLocaleDateString()

  // function getDate(date) {
  //   date = new Date(date).toLocaleDateString('en-US');
  //  }

  console.log(props)

  const myReviewsJsx = user.reviews.map(review => (
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
    <div className="my-reviews-section"  onClick={toggleExpand}>
      <div className={`my-reviews  my-reviews-title ${isExpanded ? 'active' : ''}`}>
        My Reviews
      </div>
      <div
        ref={content}
        style={{ maxHeight }}
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
