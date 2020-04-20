import React from "react"
import { StarRating } from '../Review/StarsRating'
import './ReviewCard.scss'

class ReviewCard extends React.Component {
  constructor() {
    super()

  }

render() {

  const {value} = this.props;

    return (
       <div className= 'Border'>
          <div className='header-container'>
          <h1>{this.props.review && this.props.review.work_space.name}</h1>
            <StarRating
             value={this.props.review && this.props.review.rating}
             emptyStarColor='#FFFF00'
             editing={false}
            />
            <p>{this.props.review && this.props.review.work_space.address}</p>
          </div>
          <div className="body-container">
            <p>{this.props.review && this.props.review.note}</p>
            <h2>Date of Review</h2>
          </div>
        </div>
    );
  }
}

export default ReviewCard
