import React from 'react';
// import '../popUp.scss'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import WorkSpaceButton from './WorkSpaceButton'
import './WorkSpace.scss'

// import Form from 'react-bootstrap/Form'
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

    // reset placeData and poiLocation if component unmounts
    componentWillUnmount = () => {
      this.props.setApp({ placeData: null, poiLocation: null, placeId: null })
    }

    componentDidMount(props) {
      console.log('reviewform data' + this.props.placeData)
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
      .then(data => {
        // console.log(data)
        axios(apiUrl + '/work_spaces')
          .then(data => {
              console.log(data)
              this.props.setApp({ allData: data.data.work_spaces })
              this.closeWindow()
          })
        
      })
      
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

          <h1>{placeName}</h1>

          <img width={'90%'} alt={'pic'} src={placeImage || '../../loading-cat.gif'} />
          <Button type="submit" onClick={this.handleSubmit}> Create New WorkSpace </Button>
      </div>
      )
    }
  }




  export default WorkSpaceCreate;
