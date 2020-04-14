import React from "react"
import { StarRating } from '../Review/StarsRating'
import './ReviewCard.scss'
// import image from '..././../public/image_not_found.png'


class ReviewCard extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      rating: 3,
      note:'',
      distance: '',
      hours: false,
      address: '',
      image_url: ''

    }

  }
render() {
  const {value} = this.props;
    return (
       <div>
          <div className='header-container-wrapper'>
            <h1>Your Review</h1>
            <StarRating
             value={value}
             emptyStarColor='#FFFF00'
             editing={false}
            />
            <h2>Date of Review</h2>
        </div>
        <div className="body-container-wrapper">
            <h1>{this.props.review && this.props.review.work_space.name}</h1>
            <StarRating
             value={this.props.review && this.props.review.work_space.rating}
             emptyStarColor='#4775FF'
             editing={false}
            />
            <p>{this.props.review && this.props.review.work_space.address}</p>
          <div className="image">
            <img src={this.props.review && this.props.review.work_space.photo}/>
            </div>
            <p>{this.props.review && this.props.review.note}</p>



        </div>
      </div>
    );
  }
}

export default ReviewCard
