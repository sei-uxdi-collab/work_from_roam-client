import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { StarRating } from './StarsRating'
import { createReview } from '../../api/auth'
import messages from '../AutoAlert/messages'
import './ReviewCreate.scss'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

  class ReviewCreate extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rating: 3,
        review: '',
        wifi: '',
        noise: 3,
        bathroom: 3,
        coffee: false,
        food: false,
        outlet: false,
        seating: '',
        display: 'block',
        redirect: false,
        isChecked: props.isChecked || false
      }
      this.toggleChange = this.toggleChange.bind(this);
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
      // console.log(event.target.value)
    }

    toggleChange = (event) => {
      this.setState({ [event.target.name]: !this.state[event.target.name] })
    }

    handleSubmit = (event) => {
      event.preventDefault()

      const { alert, currentWorkspace, user } = this.props
      const { rating, noise, bathroom, seating, coffee, outlet, food, wifi, review } = this.state

      createReview({
        id: currentWorkspace.id,
        rating,
        noise,
        bathroom,
        seating,
        coffee: coffee ? "5" : "0",
        outlet: outlet ? "5" : "0",
        food: food ? "5" : "0",
        wifi: wifi,
        note: review,
        token: user.token,
      })
      .then(() => {
        // reload all workspace data
        axios(apiUrl + '/work_spaces')
          .then(data => this.props.setApp({ allData: data.data.work_spaces }))
        this.setState({ display: 'none' })
      })
      .then(() => alert({
        heading: 'Thanks for your review!',
        message: messages.reviewCreateSuccess,
        variant: 'success',
        image: 'Roman.png'
      }))
      .catch(() => alert('create review failed'))
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
        return (<Redirect to='/sign-in'/>)
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
          <Form onSubmit={this.handleSubmit} class="ml-1">
            <Form.Group className="stars">
              <StarRating
                value={this.state.rating}
                onStarClick= {(val) => this.setState({ rating: val })}
            />
            </Form.Group>

            <Form.Label className="question-header" htmlFor="wifi">General Information*</Form.Label>
            <Form.Row className="gen-info-options">
              <Form.Group>
                <Form.Check
                  className="checkbox-toolbar"
                  type="checkbox"
                  label="Outlets"
                  onChange={this.toggleChange}
                  name="outlet"
                  id="outlet"
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
                />
              </Form.Group>
            </Form.Row>

            <Form.Group className="question mt-0">
              <Form.Label className="question-header" htmlFor="wifi">How was the Wifi?*</Form.Label>
              <Form.Row>
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="None"
                  value="0"
                  checked={this.state.wifi === '0'}
                  name="wifi"
                  onChange={this.handleChange}
                  id="wifi1"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Slow"
                  value="1"
                  checked={this.state.wifi === '1'}
                  name="wifi"
                  onChange={this.handleChange}
                  id="wifi2"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Spotty"
                  value="2.5"
                  checked={this.state.wifi === '2.5'}
                  name="wifi"
                  onChange={this.handleChange}
                  id="wifi3"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Fast!"
                  value="5"
                  checked={this.state.wifi === '5'}
                  name="wifi"
                  onChange={this.handleChange}
                  id="wifi4"
                />
              </Form.Row>
            </Form.Group>

            <Form.Group className="question">
              <Form.Label className="question-header" htmlFor="name">How noisy was it?*</Form.Label>
              <Form.Row>
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Quiet"
                  value="1"
                  checked={this.state.noise === '1'}
                  name="noise"
                  onChange={this.handleChange}
                  id="noise1"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Moderate"
                  value="2.5"
                  checked={this.state.noise === '2.5'}
                  name="noise"
                  onChange={this.handleChange}
                  id="noise2"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Loud"
                  value="5"
                  checked={this.state.noise === '5'}
                  name="noise"
                  onChange={this.handleChange}
                  id="noise3"
                />
              </Form.Row>
            </Form.Group>

            <Form.Group className="question">
              <Form.Label className="question-header" htmlFor="name">How were the bathrooms?*</Form.Label>
              <Form.Row>
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="None"
                  value="0"
                  checked={this.state.bathroom === '0'}
                  name="bathroom"
                  onChange={this.handleChange}
                  id="bathroom1"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Messy"
                  value="1"
                  checked={this.state.bathroom === '1'}
                  name="bathroom"
                  onChange={this.handleChange}
                  id="bathroom2"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Usable"
                  value="2.5"
                  checked={this.state.bathroom === '2.5'}
                  name="bathroom"
                  onChange={this.handleChange}
                  id="bathroom3"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Great!"
                  value="5"
                  checked={this.state.bathroom === '5'}
                  name="bathroom"
                  onChange={this.handleChange}
                  id="bathroom4"
                />
              </Form.Row>
            </Form.Group>

            <Form.Group className="question">
              <Form.Label className="question-header" htmlFor="seating">What was the seating like?*</Form.Label>
              <Form.Row>
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="None"
                  value="0"
                  checked={this.state.seating === '0'}
                  name="seating"
                  onChange={this.handleChange}
                  id="seating1"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Very Little"
                  value="1"
                  checked={this.state.seating === '1'}
                  name="seating"
                  onChange={this.handleChange}
                  id="seating2"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Adequate"
                  value="2.5"
                  checked={this.state.seating === '2.5'}
                  name="seating"
                  onChange={this.handleChange}
                  id="seating3"
                />
                <Form.Check
                  className="radio-toolbar"
                  type="radio"
                  label="Lots!"
                  value="5"
                  checked={this.state.seating === '5'}
                  name="seating"
                  onChange={this.handleChange}
                  id="seating4"
                />
              </Form.Row>
            </Form.Group>

            <Form.Group className="question">
              <Form.Label className="question-header" htmlFor="name">Write a review (optional)</Form.Label>
              <Form.Control
                style={{ height: '60px' }}
                type="text"
                as="textarea"
                placeholder="Enter Your Review..."
                value={this.state.review}
                name="review"
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
