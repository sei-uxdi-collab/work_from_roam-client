import React, { useRef, useState } from "react";
import { Row, Col } from 'react-bootstrap';
import StarRatingComponent from "react-star-rating-component";
import Button from 'react-bootstrap/Button'
import "./MyReviews.scss";
import { deleteReview } from '../../api/delete'

function MyReviews(props) {
  const { user, isExpanded, toggleExpand, allData, setApp, showWorkspace } = props
  const content = useRef(null);
  const maxHeight = isExpanded ? `${content.current.scrollHeight}px` : "0px"
  const [open, setOpen] = useState();

  console.log(props)

  // function onKebabClick () {
  //   if(!open) setOpen(true);
  //   else setOpen(false);
  // }

  const onUpdateClick = review => {
    const currentReview = review
    const currentWorkspace = allData.find(workspace => workspace.id === review.work_space.id)
    setApp({ currentReview, currentWorkspace })
  }

  const onDeleteReview = (review, user) => {
    deleteReview(review, user)
  }

  // const optionsJsx = review => (
  //   <Fragment>
  //     <div className="container options-box">
  //       <Row className="outline-bottom">
  //         <Button href={`#reviews/${review.id}/update`} onClick={() => onUpdateClick(review)}>Update</Button>
  //       </Row>
  //       <Row>
  //         <Button onClick={onDeleteReview}>Delete</Button>
  //       </Row>
  //     </div>
  //   </Fragment>
  // )

  const myReviewsJsx = user.reviews.map(review => (
    <li
      key={review.id}
      href={`#workplace/${review.id}`}
    >
    <div className="my-reviews-card">
      <div className="card-content">
        <Row>
          <Col xs={10} className="pl-0">
            <div className="workplace-title"> {review.work_space.name}</div>
          </Col>
          <Col>
            <div
              aria-expanded={(open) === true ? "true" : "false"}
              className={open === true ? "active dropdown-button" : "dropdown-button"}
              onClick={ () => setOpen(review.id) }
            >
              <img src="kebab-icon-blue.svg" alt="options" className="kebab"/>
            </div>
            <div className={(open === review.id) ? "show options-box d-flex flex-column justify-content-center" : "hide options-box d-flex flex-column justify-content-center"}>
                <Button
                href={`#reviews/${review.id}/update`}
                onClick={() => onUpdateClick(review)}
                className="m-0 p-0 option-button line-under"
                >
                  <img src="edit-icon-blue.svg" alt="edit" className="options-icon"/>EDIT
                </Button>
                <Button
                  onClick={() => { if (window.confirm('Are you sure?')) onDeleteReview(review, user) }}
                  className="m-0 p-0 option-button"
                >
                  <img src="delete-icon-blue.svg" alt="delete" className="options-icon"/>DELETE
                </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="my-reviews-stars">
            <StarRatingComponent
             name='name'
             value={review.rating}
             editing={false}
             renderStarIcon={(nextValue, prevValue) =>
               (nextValue <= prevValue) ?
                 <img src="star-icon.svg" className="my-reviews-star" alt="star"/> :
                 <img src="star-icon-empty-gray.svg" className="my-reviews-star" alt="star"/>}
            />
          </div>
        </Row>
        <Row>
          <span className=" mt-2 mb-2 plain-text note"> {review.note} </span>
        </Row>
        <Row>
          <Col xs={11} className="m-0 p-0">
            <span className="date-created"> <img className="created-at-icon" src="created-at-icon.svg" alt="created date"/> {review.date} </span>
          </Col>
          <Col xs={1} className="m-0 p-0" onClick={() => showWorkspace(review.work_space.id, review.work_space.place_id)}>
          <span><svg  className="my-reviews-right-arrow" width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.40573 0.293723C8.4999 0.200617 8.61177 0.126747 8.73492 0.076345C8.85808 0.0259431 8.99011 0 9.12345 0C9.25679 0 9.38882 0.0259431 9.51198 0.076345C9.63514 0.126747 9.74701 0.200617 9.84118 0.293723L15.9236 6.29242C16.018 6.38529 16.0929 6.49561 16.144 6.61708C16.1951 6.73854 16.2214 6.86876 16.2214 7.00026C16.2214 7.13177 16.1951 7.26198 16.144 7.38345C16.0929 7.50491 16.018 7.61524 15.9236 7.70811L9.84118 13.7068C9.65082 13.8945 9.39265 14 9.12345 14C8.85426 14 8.59608 13.8945 8.40573 13.7068C8.21538 13.5191 8.10844 13.2644 8.10844 12.999C8.10844 12.7335 8.21538 12.4788 8.40573 12.2911L13.7724 7.00026L8.40573 1.70941C8.31133 1.61654 8.23643 1.50622 8.18532 1.38475C8.13422 1.26329 8.10791 1.13307 8.10791 1.00157C8.10791 0.870063 8.13422 0.739849 8.18532 0.618385C8.23643 0.496921 8.31133 0.386594 8.40573 0.293723Z"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 7.00076C0 6.7356 0.106804 6.4813 0.296916 6.29381C0.487028 6.10631 0.744874 6.00098 1.01373 6.00098H14.1923C14.4611 6.00098 14.719 6.10631 14.9091 6.29381C15.0992 6.4813 15.206 6.7356 15.206 7.00076C15.206 7.26592 15.0992 7.52022 14.9091 7.70771C14.719 7.89521 14.4611 8.00054 14.1923 8.00054H1.01373C0.744874 8.00054 0.487028 7.89521 0.296916 7.70771C0.106804 7.52022 0 7.26592 0 7.00076Z"/>
          </svg></span>
          </Col>
        </Row>
      </div>
    </div>
    </li>
  ))

  if (user.reviews.length === 0) {
    return (
      <div className="my-reviews-section">
        <div className={`my-reviews  my-reviews-title ${isExpanded ? 'active' : ''}`} onClick={toggleExpand}>
          My Reviews
        </div>
        <div
          ref={content}
          style={{ maxHeight }}
          className="my-reviews-content no-reviews"
        >
        <ul className="my-favorite-card no-reviews">
          Write reviews for spaces you've visited!
        </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-reviews-section">
        <div className={`my-reviews  my-reviews-title ${isExpanded ? 'active' : ''}`} onClick={toggleExpand}>
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
}

export default MyReviews;
