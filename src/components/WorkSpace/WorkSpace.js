import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Review from '../Review/Review'

import './WorkSpace.css'

// import TestButton from './TestButton'


class WorkSpace extends React.Component {
    constructor(props) {
        super(props)
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

      if(this.props.data.reviews.length < 1) {
        return (
            <div className='workspace'>
              <Link to='/'>
                <h5 style={{ float: 'right' }}>X</h5>
              </Link>
              <div style={{ textAlign: 'center' }}>
                <h3>Be the first to write a  <Button
                data={this.props.data.id}
                href={`#work_spaces/${this.props.data.id}/create-review`}
              >
                Review
              </Button> for</h3>
                <h3>{this.props.placeData && this.props.placeData.name}</h3>
              </div>
            </div>)
      }

    // Function for averaging the different amenities for Review
      let average = function(array) {
        let answer = 0
        let length = array.length
        for(let i = 0; i < array.length; i++) {
          answer += array[i]
        }
        return Math.round(answer/length)
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
                <h5 style={{ float: 'right' }}>X</h5>
              </Link>
                <br />
                <br />
                <br />
              <div>
                <img accept="*/*" height='150px' alt="work_space_pic" src={photo} />
              </div>
                <br />
              <div className="work-space-div">
                <div>
                  <h4 style={{ textAlign: 'center', color: 'black' }}><a
                    className="link"
                    style={{ textDecoration: 'none' }}
                    href={this.props.placeData && this.props.placeData.website}
                    target='_blank'
                    rel="noopener noreferrer"
                    >
                    {this.props.placeData && this.props.placeData.name}
                    </a></h4>
                </div>
                <div>
                  <p>Overall Rating: {overall}</p>
                  <p>Bathroom Rating: {bath}</p>
                  <p>Noise Level: {noise}</p>
                </div>
              <hr />
                <div>
                  <h3 >Reviews</h3>
                    <Button
                      className=""

                      data={this.props.data.id}
                      href={`#work_spaces/${this.props.data.id}/create-review`}
                    >
                      Add a Review
                    </Button>
                </div>

              <div className="scroll" style={{ color: 'red', textAlign: 'center' }}>
              {this.props.data.reviews.map(review => (
                <Review
                  key={review.id}
                  rating={review.rating}
                  wifi={review.wifi}
                  noise={review.noise}
                  bathroom={review.bathroom}
                  seating={review.seating}
                  outlet={review.outlet}
                  food={review.food}
                  coffee={review.coffee}
                  note={review.note}
                />
              ))}
              </div>
              </div>

            </div>
        )
    }
}

export default WorkSpace
