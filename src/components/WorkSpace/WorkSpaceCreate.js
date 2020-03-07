import React from 'react';
import '../popUp.css'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import WorkSpaceButton from './WorkSpaceButton'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

  class WorkSpaceCreate extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        work_space_id: '',
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
      this.closeWindow()
    }

    closeWindow = () => {
      // update state which updates component's style to diplay: none
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


      console.log(placeImage)

        if (!this.props.user) {
          return (<Redirect to='/sign-in'/>)
        }

        if (this.state.display === 'none') {
          return (<Redirect to='/'/>)
        }

      return (

          <div className='popup' style={{display: this.state.display}}>

          <Link to='/'>
            <button style={{float: 'right'}} onClick={this.closeWindow}>Close</button>
          </Link>

          <h1> Review {placeName}</h1>
          <Button type="submit" onClick={this.handleSubmit}> Submit </Button>
      </div>
      )
    }
  }




  export default WorkSpaceCreate;
