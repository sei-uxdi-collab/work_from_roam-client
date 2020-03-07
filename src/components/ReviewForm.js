import React from 'react';
import './popUp.css'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

import TestButton from './TestButton'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

  class ReviewForm extends React.Component {
    constructor(props) {
      super(props)
      console.log(props.currentWorkspace.id)
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
      console.log('reviewform data', this.props.placeData)
      console.log('hello')
    }

    handleChange = (event) => {
      console.log(event.target.value)
      console.log(event.target.name)
      this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      // 1. create a workspace
      // axios({
      //   method: 'post',
      //   url: apiUrl + '/work_spaces',
      //   data: {
      //     work_space: {
      //       place_id: this.props.placeId,
      //       lat: this.props.location.lat,
      //       lng: this.props.location.lng
      //     }
      //   },
      //   headers: {
      //     Authorization: `Token token=${this.props.user.token}`
      //   }
      //
      // })
      // // 2. create a review associated with the new workspace
      // .then(data => {
        console.log(event)
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
          console.log(data)
          this.setState({ display: 'none' })
        })
      // })
      // 3. redirect to '/' and close the review form

      .catch(() => alert('create review failed'))
    }

    closeWindow = () => {
      // update state which updates component's style to diplay: none
      this.setState({ display: 'none' })
    }

    render () {
      let placeName = ''
      // if user is not signed in, redirect to '/sign-in'

      if (this.props.placeData && this.props.placeData.name) {
        placeName =
        this.props.placeData.name

      }

      let placeImage = ''

      if (this.props.placeData && this.props.placeData.photos) {
        placeImage =  this.props.placeData.photos[0].getUrl()

}


      console.log(placeImage)

        if (!this.props.user) {
          return (<Redirect to='/sign-in'/>)
        }

      return (

          <div className='popup' style={{display: this.state.display}}>

          <Link to='/'>
            <button style={{float: 'right'}} onClick={this.closeWindow}>Close</button>
          </Link>

          <h1> Review {placeName}</h1>

          <a href={this.props.placeData.website}target="_blank">
            <img height={'100px'} alt={'pic'} src={placeImage} />
          </a>

      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Rating:</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="5"
            value={this.state.rating}
            name="rating"
            onChange={this.handleChange}
          />
          <span>{this.state.rating}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Noise Level:</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="5"
            value={this.state.noise}
            name="noise"
            onChange={this.handleChange}
          />
          <span>{this.state.noise}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Bathroom:</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="5"
            value={this.state.bathroom}
            name="bathroom"
            onChange={this.handleChange}
          />
          <span>{this.state.bathroom}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="wifi">Wifi</Form.Label>
          <Form.Check
            type="radio"
            label="NONE"
            value="NONE"
            checked={this.state.wifi === 'NONE'}
            name="wifi"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="MODERATE"
            value="MODERATE"
            checked={this.state.wifi === 'MODERATE'}
            name="wifi"
            onChange={this.handleChange}
          />
          <Form.Check
            type="radio"
            label="AMPLE"
            value="AMPLE"
            checked={this.state.wifi === 'AMPLE'}
            name="wifi"
            onChange={this.handleChange}
          />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="seating">Seating</Form.Label>
            <Form.Check
              type="radio"
              label="NONE"
              value="NONE"
              checked={this.state.seating === 'NONE'}
              name="seating"
              onChange={this.handleChange}
            />
            <Form.Check
              type="radio"
              label="MODERATE"
              value="MODERATE"
              checked={this.state.seating === 'MODERATE'}
              name="seating"
              onChange={this.handleChange}
            />
            <Form.Check
              type="radio"
              label="AMPLE"
              value="AMPLE"
              checked={this.state.seating === 'AMPLE'}
              name="seating"
              onChange={this.handleChange}
            />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="outlet">OUTLETS</Form.Label>
              <Form.Check
                type="radio"
                label="NONE"
                value="NONE"
                checked={this.state.outlet === 'NONE'}
                name="outlet"
                onChange={this.handleChange}
              />
              <Form.Check
                type="radio"
                label="MODERATE"
                value="MODERATE"
                checked={this.state.outlet === 'MODERATE'}
                name="outlet"
                onChange={this.handleChange}
              />
              <Form.Check
                type="radio"
                label="AMPLE"
                value="AMPLE"
                checked={this.state.outlet === 'AMPLE'}
                name="outlet"
                onChange={this.handleChange}
              />
              </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="coffee">COFFEE</Form.Label>
              <Form.Check
                type="radio"
                label="YES"
                value="YES"
                checked={this.state.coffee === 'YES'}
                name="coffee"
                onChange={this.handleChange}
              />
              <Form.Check
                type="radio"
                label="NO"
                value="NO"
                checked={this.state.coffee === 'NO'}
                name="coffee"
                onChange={this.handleChange}
              />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="food">FOOD</Form.Label>
                <Form.Check
                  type="radio"
                  label="YES"
                  value="YES"
                  checked={this.state.food === 'YES'}
                  name="food"
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  label="NO"
                  value="NO"
                  checked={this.state.food === 'NO'}
                  name="food"
                  onChange={this.handleChange}
                />
                </Form.Group>
          <Form.Group>
          <Form.Label htmlFor="name">Review</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Review..."
            value={this.state.review}
            name="review"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button type="submit"> Submit </Button>
        </Form>
      </div>
      )
    }
  }




  export default ReviewForm;
