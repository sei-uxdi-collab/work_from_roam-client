import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { StarRating } from './StarsRating'

// import TestButton from '../TestButton'
import messages from '../AutoAlert/messages'
import './ReviewForm.scss'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

  class ReviewCreate extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        work_space_id: props.currentWorkspace.id,
        rating: 3,
        review: '',
        wifi: '',
        noise: 3,
        bathroom: 3,
        coffee: '',
        food: '',
        outlet: '',
        seating: '',
        display: 'block',
        redirect: false
      }
    }

    componentDidMount(props) {
      console.log('reviewform data: ' + this.props.placeData)
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
      // console.log(event.target.value)
    }

    handleSubmit = (event) => {
      event.preventDefault()

      const { alert } = this.props

        axios({
          method: 'post',
          url: apiUrl + '/reviews',
          data: {
            review: {
              work_space_id: this.state.work_space_id,
              rating: this.state.rating,
              noise: this.state.noise,
              bathroom: this.state.bathroom,
              seating: this.state.seating,
              coffee: this.state.coffee,
              outlet: this.state.outlet,
              food: this.state.food,
              wifi: this.state.wifi,
              note: this.state.review
            }
          },
          headers: {
            Authorization: `Token token=${this.props.user.token}`
          }
        })
        .then(data => {
          // console.log(data)
          axios(apiUrl + '/work_spaces')
            .then(data => {
                // console.log(data)
                this.props.setApp({ allData: data.data.work_spaces })
            })
          this.setState({ display: 'none' })
        })
        .then(() => alert({
        heading: 'Thanks for your review!',
        message: messages.reviewCreateSuccess,
        variant: 'success',
        image: 'Roman.png'
      }))
      // 3. redirect to '/' and close the review form
      .catch(() => alert('create review failed'))
    }

    closeWindow = () => {
      // update state which updates component's style to display: none
      this.setState({ display: 'none' })
    }

    render () {
      let placeName = ''
      // if user is not signed in, redirect to '/sign-in'

      if (this.props.placeData && this.props.placeData.name) {
        placeName = this.props.placeData.name
      }

      let placeImage = ''

      if (this.props.placeData && this.props.placeData.photos) {
        placeImage =  this.props.placeData.photos[0].getUrl()

}


      // console.log(placeImage)

        if (!this.props.user) {
          return (<Redirect to='/sign-in'/>)
        }

        if (this.state.display === 'none') {
          return (<Redirect to='/'/>)
        }

      return (

          <div className='review-form' style={{display: this.state.display}}>

          <Link to='/'>
            <button className="close-window" style={{float: 'right'}} onClick={this.closeWindow}>X</button>
          </Link>


          {/* This is the tag for the place image, commented out (for now)
            <a href={this.props.placeData.website} target="_blank" rel="noopener noreferrer">
              <img height={'100px'} alt={'pic'} src={placeImage} />
            </a>
             */}
      <div className="review-scroll">
      <h1 className="main-header">Give {placeName} a review!</h1>
      <Form onSubmit={this.handleSubmit}>
      {/* This is where the star rating will go
        < StarComponent />
        */}
        <Form.Group>
          <Form.Label htmlFor="name">Overall Rating:</Form.Label>
          <StarRating
            value={this.state.rating}
            onStarClick= {(val) => this.setState({ rating: val })}

        />

          <span>{this.state.rating}</span>
        </Form.Group>

        <h2 className="question-header">General Information</h2>
        <Form.Group>
          <Form.Label htmlFor="outlet">Outlets</Form.Label>
          <Form.Check
            type="radio"
            label="YES"
            value="5"
            checked={this.state.outlet === '5'}
            name="outlet"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="NO"
            value="0"
            checked={this.state.outlet === '0'}
            name="outlet"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="coffee">Coffee</Form.Label>
          <Form.Check
            type="radio"
            label="YES"
            value="5"
            checked={this.state.coffee === '5'}
            name="coffee"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="NO"
            value="0"
            checked={this.state.coffee === '0'}
            name="coffee"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="food">Food</Form.Label>
          <Form.Check
            type="radio"
            label="YES"
            value="5"
            checked={this.state.food === '5'}
            name="food"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="NO"
            value="0"
            checked={this.state.food === '0'}
            name="food"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="wifi">How was the Wifi?*</Form.Label>
          <Form.Check
            type="radio"
            label="None"
            value="0"
            checked={this.state.wifi === '0'}
            name="wifi"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Slow"
            value="1"
            checked={this.state.wifi === '1'}
            name="wifi"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Spotty"
            value="2.5"
            checked={this.state.wifi === '2.5'}
            name="wifi"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Fast!"
            value="5"
            checked={this.state.wifi === '5'}
            name="wifi"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="name">How noisy was it?*</Form.Label>
          <Form.Check
            type="radio"
            label="Quiet"
            value="1"
            checked={this.state.noise === '1'}
            name="noise"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Moderate"
            value="2.5"
            checked={this.state.noise === '2.5'}
            name="noise"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Loud"
            value="5"
            checked={this.state.noise === '5'}
            name="noise"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="name">How were the bathrooms?*</Form.Label>
          <Form.Check
            type="radio"
            label="None"
            value="0"
            checked={this.state.bathroom === '0'}
            name="bathroom"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Messy"
            value="1"
            checked={this.state.bathroom === '1'}
            name="bathroom"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Usable"
            value="2.5"
            checked={this.state.bathroom === '2.5'}
            name="bathroom"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Great!"
            value="5"
            checked={this.state.bathroom === '5'}
            name="bathroom"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="seating">What was the seating like?*</Form.Label>
          <Form.Check
            type="radio"
            label="None"
            value="0"
            checked={this.state.seating === '0'}
            name="seating"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Very Little"
            value="1"
            checked={this.state.seating === '1'}
            name="seating"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Adequate"
            value="2.5"
            checked={this.state.seating === '2.5'}
            name="seating"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="Lots!"
            value="5"
            checked={this.state.seating === '5'}
            name="seating"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="name">Write a review (optional)</Form.Label>
          <Form.Control
            style={{ height: '50px', width: '250px' }}
            type="text"
            as="textarea"
            placeholder="Enter Your Review..."
            value={this.state.review}
            name="review"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button type="submit" className="submit-button"> Submit </Button>
        </Form>
        </div>
      </div>
      )
    }
  }




  export default ReviewCreate;
