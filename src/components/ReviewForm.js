import React from 'react';
import './ReviewForm.css'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import TestButton from './TestButton'

  class ReviewForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rating: 3,
        review: '',
        display: 'block',
        redirect: false
      }
    }

    componentDidMount() {
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
      axios({
        method: 'post',
        url: apiUrl + '/work_spaces',
        data: {
          work_space: {
            place_id: this.props.placeId,
            lat: this.props.location.lat,
            lng: this.props.location.lng
          }
        },
        headers: {
          Authorization: `Token token=${this.props.user.token}`
        }

      })
      // 2. create a review associated with the new workspace
      .then(data => {
        console.log(data)
        axios({
          method: 'post',
          url: apiUrl + '/reviews',
          data: {
            review: {
              rating: this.state.rating,
              note: this.state.review,
              work_space_id: data.data.work_space.id
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
      })
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

        if (!this.props.user) {
          return (<Redirect to='/sign-in'/>)
        }

      return (

          <div className='review-form' style={{display: this.state.display}}>

          <Link to='/'>
            <button style={{float: 'right'}} onClick={this.closeWindow}>Close</button>
          </Link>

          <h1> Review {placeName} </h1>

            <form onSubmit={this.handleSubmit}>

              <label> Rating: </label>
              <input name="rating" type="range" min="0" max="5" value={this.state.rating} onChange={this.handleChange}/>
              <p>{this.state.rating}</p>

              <label> Review: </label>
              <textarea name="review" value={this.state.review} onChange={this.handleChange} required/>
              <button> Submit </button>

            </form>
          </div>
      )
    }
  }




  export default ReviewForm;
