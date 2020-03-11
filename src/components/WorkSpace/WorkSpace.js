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
            test: true,
            filters: false
        }
    }

    // Function to show more filters
   show = () => {
      this.setState({ filters: true })
    }
    // Function to show less filters
    notshow = () => {
       this.setState({ filters: false })
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
      // Wifi average rating
      let wifi = average(this.props.data.reviews.map(review => parseInt(review.wifi)))
      // Seating average Rating
      let seating = average(this.props.data.reviews.map(review => parseInt(review.seating)))
      // Outlets average rating
      let outlet = average(this.props.data.reviews.map(review => parseInt(review.outlet)))
      // Coffee average Rating
      let coffee = average(this.props.data.reviews.map(review => parseInt(review.coffee)))
      // Food average rating
      let food = average(this.props.data.reviews.map(review => parseInt(review.food)))

      // Style booleans for showing filter options as being available or not
      let outletStyle = false
      let coffeeStyle = false
      let foodStyle = false

      // Conditionals for showing if filters are available
      if(outlet > 0) {
        console.log(outlet)
        outletStyle = true
      }
      if(coffee > 0) {
        coffeeStyle = true
      }
      if(food > 0) {
        foodStyle = true
      }

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
                  <h4 style={{ color: 'black' }}><a
                    className="link"
                    style={{ textDecoration: 'none' }}
                    href={this.props.placeData && this.props.placeData.website}
                    target='_blank'
                    rel="noopener noreferrer"
                    >
                    {this.props.placeData && this.props.placeData.name}
                    </a> - Rating: {overall}<br />Address here<br />Hours here</h4>

                </div>
                <div>
                  <h5>WIFI: {wifi}</h5>
                  <h5>Noise: {noise}</h5>
                  <h5>Seating: {seating}</h5>
                  <h5>Bathroom: {bath}</h5>
                  {!this.state.filters && <button
                    style={{ float: 'right', border: 'none' }}
                    onClick={this.show}
                  >
                  more
                  </button>}
                  {this.state.filters &&
                    <div>
                      <button
                        onClick={this.notshow}
                        style={{ float: 'right', border: 'none' }}>
                      less
                      </button>
                      <br />
                      <br />
                      <div style={{ display: 'flex' }}>
                        <button id="outlets" style={{ margin: '10px', color: outletStyle ? 'red' : 'blue' }}>outlets</button>
                        <button id="coffee" style={{ margin: '10px', color: coffeeStyle ? 'red' : 'blue' }}>coffee</button>
                        <button id="food" style={{ margin: '10px', color: foodStyle ? 'red' : 'blue' }}>food</button>
                      </div>
                    </div>}
                </div>
                <br />
              <hr />
                <div style={{ display: 'flex' }}>
                  <div><h3 style={{ margin: '0px' }}>Reviews</h3></div>
                  <div>
                    <h4><Button
                      style={{ float: 'right' }}
                      data={this.props.data.id}
                      href={`#work_spaces/${this.props.data.id}/create-review`}
                    >
                      Write a Review
                    </Button></h4>
                  </div>
                </div>
                <br />

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
