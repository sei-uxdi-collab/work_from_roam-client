import React from "react"
import { StarRating } from '../Review/StarsRating'
import { calculateDistanceMiles } from '../../helper/calculatoreDistance'
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

  const location1 = { lat: this.props.lat, lng: this.props.lng };
  const location2 = { lat: -45, lng: -48 };
const calculatedDistanceValue = calculateDistanceMiles(location1, location2);

    return (
       <div>
          <div className='header-container-wrapper'>
            <h1 className='text-center'>Your Review</h1>
            <StarRating
             value={value}
             emptyStarColor='#FFFF00'
             editing={false}
            />
            <h2 className='text-center'>Date of Review</h2>
        </div>
        <div className="body-container-wrapper">
            <h1>{this.props.review && this.props.review.work_space.name}</h1>
          <div className='text-center'>
            <StarRating
             value={this.props.review && this.props.review.work_space.rating}
             emptyStarColor='#4775FF'
             editing={false}
            />
            </div>
            <p>{this.props.review && this.props.review.work_space.address}</p>
          <p>{calculatedDistanceValue} miles</p>
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
