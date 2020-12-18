import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import StarRatingComponent from "react-star-rating-component";
import { updateReview } from '../../api/update'
import { createReview, createWorkspace } from '../../api/create'
import messages from '../AutoAlert/messages'
import './ReviewCreate.scss'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SignInAlert from '../WorkSpace/SignInAlert';

  class ReviewCreate extends React.Component {
    constructor(props) {
      super(props)
      const defaultValues = props.currentReview || {}
      this.state = {
        alcohol: defaultValues.alcohol || false,
        goodforgroup: defaultValues.goodforgroup || false,
        meetingspace: defaultValues.meetingspace || false,
        outdoorspace: defaultValues.outdoorspace || false,
        parking: defaultValues.parking || false,
        petfriendly: defaultValues.petfriendly || false,
        rating: defaultValues.rating || 0,
        note: defaultValues.note || '',
        wifi: defaultValues.wifi || 3,
        wifipass: defaultValues.wifipass || false,
        noise: defaultValues.noise || 3,
        bathroom: defaultValues.bathroom || false,
        coffee: defaultValues.coffee || false,
        food: defaultValues.food || false,
        outlet: defaultValues.outlet || false,
        seating: defaultValues.seating || 3,
        clean: defaultValues.clean || 3,
        display: 'block',
        redirect: false,
        isChecked: props.isChecked || false,
        submitError: false,
      }
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    toggleChange = (event) => {
      this.setState({ [event.target.name]: !this.state[event.target.name] })
    }

    submitReviewUpdate = () => {
      const { alert, user } = this.props
      const { id } = this.props.currentReview
      const token = user.token
      const { rating, noise, bathroom, seating, coffee, outlet, food, wifi,
        note, petfriendly, goodforgroup, meetingspace, outdoorspace,
        parking, alcohol, wifipass, clean } = this.state
      
      updateReview({ id, rating, noise, bathroom, seating, coffee, outlet,
        food, wifi, note, petfriendly, token, goodforgroup,
        meetingspace, outdoorspace, parking, alcohol, wifipass, clean })
        .then(() => {
          axios(apiUrl + '/work_spaces').then(data => this.props.setApp({ allData: data.data.work_spaces }))
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

    //submit review for given workspace id
    submitReview = (id) => {
      const { rating, noise, bathroom, seating, coffee, outlet, food, wifi,
              note, wifipass, alcohol, goodforgroup, meetingspace, outdoorspace,
              parking, petfriendly, clean } = this.state
      const { alert, user } = this.props
      const token = user.token


      createReview({ id, rating, noise, bathroom, seating, coffee, outlet, food,
                     wifi, note, token, wifipass, alcohol, goodforgroup,
                     meetingspace, outdoorspace, parking, petfriendly, clean })
        .then(() => {
          // reload all workspace data
          axios(apiUrl + '/work_spaces')
            .then(data => this.props.setApp({ allData: data.data.work_spaces }))
          this.setState({ display: 'none' })
          alert({
            heading: 'Thanks for your review!',
            message: messages.reviewCreateSuccess,
            variant: 'light',
            image: 'logo-bull-icon.svg'
          })
        })
        .catch(() => alert('create review failed'))
    }

    newWorkspaceReview = () => {
      const { placeId, location, placeData, user } = this.props
      const { lat, lng } = location
      const name = placeData.name
      const address = placeData.formatted_address
      const addresscomponent = placeData.address_components
      const photo = placeData.photos && placeData.photos[0].getUrl()
      const phone = placeData.formatted_phone_number
      const token = user.token
      createWorkspace({ placeId, lat, lng, name, address, addresscomponent, photo, token, phone })
        .then(data => this.submitReview(data.data.work_space.id))
    }

    handleSubmit = (event) => {
      event.preventDefault()
      const { currentWorkspace, currentReview } = this.props

      if (!this.state.rating) {
        this.setState({ submitError: true })
        document.getElementById('rate-your-experience').scrollIntoView()
        return
      }

      if (currentReview) {
        this.submitReviewUpdate()
        return
      }

      if (!currentWorkspace) {
        this.newWorkspaceReview()
      } else {
        this.submitReview(currentWorkspace.id)
      }
    }

    closeWindow = () => {
      // update state which updates component's style to display: none
      this.setState({ display: 'none' })
    }

    render () {
      let placeName = ''
      if (this.props.placeData && this.props.placeData.name) {
        placeName = this.props.placeData.name
      }

      // if user is not signed in, redirect to '/sign-in'
      if (!this.props.user) {
        return (<SignInAlert redirect='create-review' setApp={this.props.setApp} />)
      }

      if (this.state.display === 'none') {
        return (<Redirect to='/'/>)
      }

      return (

      <div className='review-form' style={{display: this.state.display}}>

        <div className="review-scroll">
          <Link to='/' className="close-window-white" onClick={this.closeWindow}>
            <img src="close-x-white.png" alt="close"/>
          </Link>
          <h1 className="main-header ">Give {placeName} a review!</h1>
          <h2 className="sub-header ">* Required Fields</h2>
          <Form onSubmit={this.handleSubmit} className="ml-1">
            <Form.Label style={this.state.submitError ? {color: '#EF0909'} : {}} className="question-header mt-3 mb-0" htmlFor="rating" id="rate-your-experience" >Rate Your Experience*</Form.Label>
            <Form.Group className="stars">
              <StarRatingComponent
                value={this.state.rating}
                onStarClick= {(val) => this.setState({ rating: val, submitError: false })}
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
              <Form.Label className="question-header mb-0">How was the Wifi?</Form.Label>
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
              <Form.Label className="question-header mb-0">What was the noise level?</Form.Label>
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
              <Form.Label className="question-header mb-0">How easily did you find a seat?</Form.Label>
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

            <Form.Group className="question mt-3" controlId="clean">
              <Form.Label className="question-header mb-0">How clean was the space?</Form.Label>
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




export default ReviewCreate;
