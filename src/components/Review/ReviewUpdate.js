import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import StarRatingComponent from "react-star-rating-component";
import { updateReview } from '../../api/update'
import messages from '../AutoAlert/messages'
import './ReviewCreate.scss'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

  class ReviewUpdate extends React.Component {
    constructor(props) {
      super(props)
      if (props.currentReview) {
        this.state = {
          rating: this.props.currentReview.rating,
          note: this.props.currentReview.note,
          petfriendly: this.props.currentReview.petfriendly,
          wifi: this.props.currentReview.wifi,
          wifipass: this.props.currentReview.wifipass,
          meetingspace: this.props.currentReview.meetingspace,
          noise: this.props.currentReview.noise,
          outdoorspace: this.props.currentReview.outdoorspace,
          alcohol: this.props.currentReview.alcohol,
          bathroom: this.props.currentReview.bathroom,
          coffee: this.props.currentReview.coffee,
          food: this.props.currentReview.food,
          goodforgroup: this.props.currentReview.goodforgroup,
          outlet: this.props.currentReview.outlet,
          parking: this.props.currentReview.parking,
          seating: this.props.currentReview.seating,
          clean: this.props.currentReview.clean,
          display: 'block',
          redirect: false,
          isChecked: props.isChecked || false
        }
      }
      
      this.toggleChange = this.toggleChange.bind(this);
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    toggleChange = (event) => {
      this.setState({ [event.target.name]: !this.state[event.target.name] })
    }

    handleSubmit = (event) => {
      event.preventDefault()

      const { rating, noise, bathroom, seating, coffee, outlet, food, wifi,
              note, petfriendly, goodforgroup, meetingspace, outdoorspace,
              parking, alcohol, wifipass, clean } = this.state
      const { alert, user } = this.props
      const token = user.token
      const id = this.props.currentReview.id
      updateReview({ id, rating, noise, bathroom, seating, coffee, outlet,
                     food, wifi, note, petfriendly, token, goodforgroup,
                     meetingspace, outdoorspace, parking, alcohol, wifipass, clean })
       .then(data => {
         axios(apiUrl + '/work_spaces')
           .then(data => {
               this.props.setApp({ allData: data.data.work_spaces })
           })
       })
        .then(() => {
          this.setState({ display: 'none' })
          alert({
            heading: 'Your review has been updated!',
            message: messages.reviewCreateSuccess,
            variant: 'light',
            image: 'logo-text-only.svg'
          })
       })
        .catch(() => alert('update review failed'))
    }

    onStarClick(value, prevValue, name) {
      this.setState({rating: value});
    }

    closeWindow = () => {
      // update state which updates component's style to display: none
      this.setState({ display: 'none' })
    }

    render () {
      let placeName = ''
      if (this.props.currentWorkspace && this.props.currentWorkspace.name) {
        placeName = this.props.currentWorkspace.name
      }

      // if user is not signed in, redirect to '/sign-in'
      if (!this.props.user) {
        return (<Redirect to='/sign-in'/>)
      }

      if (this.state.display === 'none') {
        return (<Redirect to='/'/>)
      }
      console.log(this.props)
      return (
      <div className='review-form' style={{display: this.state.display}}>

        <div className="review-scroll">
          <Link to='/' className="close-window-white" onClick={this.closeWindow}>
            <img src="close-x-white.png" alt="close"/>
          </Link>
          <h1 className="main-header ">Give {placeName} a review!</h1>
          <h2 className="sub-header ">* Required Fields</h2>
          <Form onSubmit={this.handleSubmit} className="ml-1">
            <Form.Label className="question-header mt-3 mb-0" htmlFor="rating">Rate Your Experience*</Form.Label>
            <Form.Group className="stars">
              <StarRatingComponent
                value={this.state.rating}
                onStarClick= {(val) => this.setState({ rating: val })}
                emptyStarColor="#FFF"
                starColor="#000"
                renderStarIcon={(nextValue, prevValue) =>
                  (nextValue <= prevValue) ?
                    <img src="star-icon.svg" className="review-star" alt="star"/> :
                    <img src="star-icon-empty.svg" className="review-star" alt="star"/>
                }
              />
            </Form.Group>

            <Form.Label className="question-header">Please highlight all that apply:</Form.Label>
            <div className="d-flex flex-wrap gen-info-options">

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Wifi Password"
                  onChange={this.toggleChange}
                  name="wifipass"
                  id="wifipass"
                  checked={this.state.wifipass}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Available Outlets"
                  onChange={this.toggleChange}
                  name="outlet"
                  id="outlet"
                  checked={this.state.outlet}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Coffee"
                  onChange={this.toggleChange}
                  name="coffee"
                  id="coffee"
                  checked={this.state.coffee}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Food"
                  onChange={this.toggleChange}
                  name="food"
                  id="food"
                  checked={this.state.food}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Beer + Wine"
                  onChange={this.toggleChange}
                  name="alcohol"
                  id="alcohol"
                  checked={this.state.alcohol}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Bathrooms"
                  onChange={this.toggleChange}
                  name="bathroom"
                  id="bathroom"
                  checked={this.state.bathroom}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Free Parking"
                  onChange={this.toggleChange}
                  name="parking"
                  id="parking"
                  checked={this.state.parking}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Outdoor Space"
                  onChange={this.toggleChange}
                  name="outdoorspace"
                  id="outdoorspace"
                  checked={this.state.outdoorspace}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Pet Friendly"
                  onChange={this.toggleChange}
                  name="petfriendly"
                  id="petfriendly"
                  checked={this.state.petfriendly}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Meeting Rooms"
                  onChange={this.toggleChange}
                  name="meetingspace"
                  id="meetingspace"
                  checked={this.state.meetingspace}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Good for Groups"
                  onChange={this.toggleChange}
                  name="goodforgroup"
                  id="goodforgroup"
                  checked={this.state.goodforgroup}
                />
              </Form.Group>

            </div>

            <Form.Group className="question mt-3" controlId="wifi">
              <Form.Label className="question-header mb-0">How was the Wifi?*</Form.Label>
              <Form.Row className="slider-text d-flex justify-content-between">
                <div className="d-inline-flex">No Wifi</div>
                <div className="d-inline-flex">Fast</div>
              </Form.Row>
              <Form.Row>
                <Form.Control
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  name="wifi"
                  className="slider"
                  value={this.state.wifi}
                  onChange={this.handleChange}
                />
              </Form.Row>
            </Form.Group>

            <Form.Group className="question mt-3" controlId="noise">
              <Form.Label className="question-header mb-0">What was the noise level?*</Form.Label>
              <Form.Row className="slider-text d-flex justify-content-between">
                <div className="d-inline-flex">Silent</div>
                <div className="d-inline-flex">Loud</div>
              </Form.Row>
              <Form.Row>
                <Form.Control
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  name="noise"
                  className="slider"
                  value={this.state.noise}
                  onChange={this.handleChange}
                />
              </Form.Row>
            </Form.Group>

            <Form.Group className="question mt-3" controlId="seating">
              <Form.Label className="question-header mb-0">How easily did you find a seat?*</Form.Label>
              <Form.Row className="slider-text d-flex justify-content-between">
                <div className="d-inline-flex">No Seats</div>
                <div className="d-inline-flex">Easily</div>
              </Form.Row>
              <Form.Row>
                <Form.Control
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  name="seating"
                  className="slider"
                  value={this.state.seating}
                  onChange={this.handleChange}
                />
              </Form.Row>
            </Form.Group>

            <Form.Group className="question mt-3" controlId="bathroom">
              <Form.Label className="question-header mb-0">How clean was the space?*</Form.Label>
              <Form.Row className="slider-text d-flex justify-content-between">
                <div className="d-inline-flex">Poor</div>
                <div className="d-inline-flex">Immaculate</div>
              </Form.Row>
              <Form.Row>
                <Form.Control
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  name="clean"
                  className="slider"
                  value={this.state.clean}
                  onChange={this.handleChange}
                />
              </Form.Row>
            </Form.Group>

            <Form.Group className="question">
              <Form.Label className="question-header" htmlFor="note">Write a review (optional)</Form.Label>
              <Form.Control
                style={{ height: '60px' }}
                type="text"
                as="textarea"
                placeholder="Enter Your Review..."
                value={this.state.note}
                name="note"
                onChange={this.handleChange}
                id="review"
                className="review-text-input"
              />
            </Form.Group>

            <Button className="submit" type="submit"> Submit </Button>
          </Form>
        </div>
      </div>
    )
  }
}




export default ReviewUpdate;
