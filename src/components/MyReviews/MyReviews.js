import React, { useRef } from "react";
import { Row, Col } from 'react-bootstrap';
import StarRatingComponent from "react-star-rating-component";
// import { StarRating } from '../Review/StarsRating'
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
          <Col xs={10} className="pl-0">
            <div className="workplace-title"> {review.work_space.name}</div>
          </Col>
        </Row>
        <Row>
          <div className="my-reviews-stars">
            <StarRatingComponent
             value={review.rating}
             emptyStarColor='#C4D3FF'
             editing={false}
             renderStarIcon={() => <img src="star-icon.svg" className="my-reviews-star" alt="star"/>}
             className="my-reviews-star"
            />
          </div>
        </Row>
        <Row>
          <span className=" mt-2 mb-2 plain-text note"> {review.note} </span>
        </Row>
        <Row>
          <span className="date-created"> <img className="created-at-icon" src="created-at-icon.svg" alt="created date"/> {review.date} </span>
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
