import React from 'react'
import { Link } from 'react-router-dom'
import './WorkSpace.css'
import Review from '../Review/Review'

import Button from 'react-bootstrap/Button'

// import TestButton from './TestButton'


class WorkSpace extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.data.reviews)
        this.state = {
            test: true
        }
    }

    // render information inside an infoWindow for POI
    render() {
      let photo = '../../loading-cat.gif'
      if (this.props.placeData && this.props.placeData.photos) {
        photo = this.props.placeData.photos[0].getUrl()
      }

    // Function for averaging the different amenities for Review
      let average = function(array) {
        let answer = 0
        let length = array.length
        for(let i = 0; i < array.length; i++) {
          answer += array[i]
        }
        return answer/length
      }
      // Overall average rating for workSpace
      let overall = average(this.props.data.reviews.map(review => review.rating))
      // Bathroom average rating
      let bath = average(this.props.data.reviews.map(review => review.bathroom))
      // Noise level average Rating
      let noise = average(this.props.data.reviews.map(review => review.noise))

        return (
            <div className='workspace' style={this.state.display}>
              <Link to='/'>
                <button style={{float: 'right'}}>Close</button>
              </Link>
              <h1>{this.props.placeData && this.props.placeData.name}</h1>
              <img accept="*/*" height='200px' src={photo} />
              <br />
              <p>WorkSpace ID: {this.props.data.id}</p>
              <a href={this.props.placeData && this.props.placeData.website} target='_blank'>visit website</a>
              <p>Overall Rating: {overall}</p>
              <p>Bathroom Rating: {bath}</p>
              <p>Noise Level: {noise}</p>
              <div className="scroll" style={{ color: 'red', textAlign: 'center' }}>
              {this.props.data.reviews.map(review => (
                <Review
                  // rating={review.rating}
                  wifi={review.wifi}
                  // noise={review.noise}
                  // bathroom={review.bathroom}
                  seating={review.seating}
                  outlet={review.outlet}
                  food={review.food}
                  coffee={review.coffee}
                  note={review.note}
                />
              ))}
              </div>
              <Button  data={this.props.data.id} href={`#work_spaces/${this.props.data.id}/create-review`}>Add a Review</Button>
            </div>
        )
    }
}

export default WorkSpace
