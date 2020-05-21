import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Review from '../Review/Review'
import StarRatingComponent from 'react-star-rating-component'
import AmenityRating from '../AmenityRating/AmenityRating.js'

import './WorkSpace.scss'

class WorkSpace extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            features: false,
            hours: false,
            flag: null
        }
    }

    // To show more features within this worspace
    showFeatures = () => {
      this.setState({ features: true })
    }
    // To hide features on collapsed
    hideFeatures = () => {
      this.setState({ features: false })
    }
    // To show more operating hours on expanded arrow
    showHrs = () => {
      this.setState({ hours: true })
    }
    // To hide hours on collapsed
    hideHrs = () => {
      this.setState({ hours: false })
    }

    // GET favorite status of current user
    componentDidMount = () => {
    if (this.props.user && this.props.data) {
        axios({
          url: `${apiUrl}/work_spaces/${this.props.data.id}/likes`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${this.props.user.token}`
          }
        })
          .then(res => this.setState({ flag: res.data[0] }))
          .catch(console.error)
    }
    }

    // Should user click on another workspace without exiting out or
    // "unmounting" the component, it will re-render with the current favorite status
    componentDidUpdate = (prevProps, prevState) => {
      if (this.props.user && this.props.data && (prevProps.data !== this.props.data)) {
        axios({
          url: `${apiUrl}/work_spaces/${this.props.data.id}/likes`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${this.props.user.token}`
          }
        })
          .then(res => this.setState({ flag: res.data[0] }))
          .catch(console.error)
      }
    }

    // render information inside an infoWindow for POI
    render() {
      // console.log(this.props.data)
      let photo = 'loading-cat.gif'
      if (this.props.placeData && this.props.placeData.photos) {
        photo = this.props.placeData.photos[0].getUrl()
      } else {
        photo = 'image_not_found.png'
      }

      // Conditionals for determining today's day and showing corresponding opening hours
      let openingHrsToday
      let today = new Date()
      let day = today.getDay()

      if (this.props.placeData && this.props.placeData.opening_hours && day === 0) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[6]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 1) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[0]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 2) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[1]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 3) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[2]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 4) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[3]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 5) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[4]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 6) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[5]
      }

      if(!this.props.data || this.props.data.reviews.length < 1) {
        return (
            <div className='userAlertCard'>
              <div className='cardContent'>
                <Row>
                  <span className='name'>{this.props.placeData && this.props.placeData.name}</span>
                </Row>
                <Row>
                  <span className='address'>{this.props.placeData && this.props.placeData.formatted_address}</span>
                </Row>
                <Row>
                  {this.props.placeData && this.props.placeData.opening_hours ? <span className='hours'>{openingHrsToday}</span> : <span className='hours'>Hours unavailable</span> }
                  <Col>
                    {this.props.placeData && this.props.placeData.opening_hours && this.props.placeData.opening_hours.isOpen() ? <span className='now open'>Open Now</span> : <span className='now close'>Closed Now</span>}
                  </Col>
                </Row>
                <Row>
                  <span className='message'>Found a hidden gem? Share it with everyone!</span>
                </Row>
                </div>
                <Row>
                <Button
                className='review'
                href={`#/create-review`}
                >
                Leave the first review
              </Button>
              </Row>
            </div>)
      }

      const telNum = `tel:+${this.props.placeData && this.props.placeData.formatted_phone_number}`

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
      // Outlets average rating
      // let outlet = average(this.props.data.reviews.map(review => parseInt(review.outlet)))
      // // Coffee average Rating
      // let coffee = average(this.props.data.reviews.map(review => parseInt(review.coffee)))
      // // Food average rating
      // let food = average(this.props.data.reviews.map(review => parseInt(review.food)))

      // Style booleans for showing filter options as being available or not
      let alcohol = false
      let coffee = false
      let food = false
      let freeParking = false
      let goodForGroups = false
      let petFriendly = false
      let meetingSpace = false
      let outlets = false
      let outdoorSpace = false
      let quiet = false

      let wifiPassword = false

      // Conditionals for showing if filters are available
      if(this.props.data.bool_alcohol === true) {
        alcohol = true
      }
      if(this.props.data.bool_coffee === true) {
        coffee = true
      }
      if(this.props.data.bool_food === true) {
        food = true
      }
      if(this.props.data.bool_parking === true) {
        freeParking = true
      }
      if(this.props.data.bool_goodforgroup === true) {
        goodForGroups = true
      }
      if(this.props.data.bool_petfriendly === true) {
        petFriendly = true
      }
      if(this.props.data.bool_meetingspace === true) {
        meetingSpace = true
      }
      if(this.props.data.bool_outdoorspace === true) {
        outdoorSpace = true
      }
      if(this.props.data.bool_outlet === true) {
        outlets = true
      }
      if(this.props.data.avgnoise < 2) {
        quiet = true
      }
      if(this.props.data.bool_wifipass === true) {
        wifiPassword = true
      }




      // Register as favorited
      const handleFave = event => {
        console.log(this.props.data)
        this.setState({ flag: true })
        axios({
          url: `${apiUrl}/work_spaces/${this.props.data.id}/like`,
          method: 'PUT',
          headers: {
            'Authorization': `Token token=${this.props.user.token}`
          }
        })
      }

      // Register as unfavorited
      const handleUnfave = event => {
        console.log(this.props.data)
        this.setState({ flag: false })
        axios({
          url: `${apiUrl}/work_spaces/${this.props.data.id}/unlike`,
          method: 'PUT',
          headers: {
            'Authorization': `Token token=${this.props.user.token}`
          }
        })
      }

        return (
            <div className='workspace' style={this.state.display}>
              <Link to='/'>
                <img style={{ float: 'right' }} alt='close' src='close-x-white.svg' width={'12'} heigth={'12'}/>
              </Link>

                <img className='workspaceImage' accept="*/*" alt="work_space_pic" src={photo} />
                <div className='buttonGroup'>
                <Button
                  className='button'
                  data={this.props.data && this.props.userLocation}
                  href={this.props.userLocation ? `https://www.google.com/maps/dir/?api=1&origin=${this.props.userLocation.lat}%2c${this.props.userLocation.lng}&destination=${this.props.data.lat}%2c${this.props.data.lng}` : `https://www.google.com/maps/dir/?api=1&origin=${this.props.data.lat}%2c${this.props.data.lng}&destination=${this.props.data.lat}%2c${this.props.data.lng}`}
                  target={'_blank'}
                  ><img src='getDirections.svg' alt='directions'/>Get Directions</Button>
                <Button
                  className='button'
                  data={this.props.data.id}
                  href={`#/create-review`}
                  ><img src='leaveReview.svg' alt='leave a review'/>Leave a Review</Button>
                {this.props.user && !this.state.flag && <Button
                                                          className='button'
                                                          data={this.props.data.id}
                                                          onClick={handleFave}
                                                          ><img src='favoriteHeartBlue.svg' alt='favorite'/>Add to Favorites</Button>}
                {this.props.user && this.state.flag && <Button
                                                          className='button'
                                                          data={this.props.data.id}
                                                          onClick={handleUnfave}
                                                          ><img src='favoriteHeartRed.svg' alt='favorite'/>Add to Favorites</Button>}
                {!this.props.user && <Button
                                        className='button'
                                        data={this.props.data.id}
                                        href={`#/sign-in`}
                                        ><img src='favoriteHeartBlue.svg' alt='favorite'/>Add to Favorites</Button>}
                </div>
                <div className='workspaceInfo'>
                <div>
                <div className='nameAndStar'>

                  <a
                    className='worspaceLink'
                    style={{ textDecoration: 'none', color: 'white', fontSize: '17px', fontWeight: '500', lineHeight: '150%' }}
                    href={this.props.placeData && this.props.placeData.website}
                    target='_blank'
                    rel="noopener noreferrer"
                    >
                    {this.props.placeData && this.props.placeData.name}
                    </a>
                    <div className='starRating'>
                    <StarRatingComponent
                     value={overall}
                     emptyStarColor='#4775FF'
                     editing={false}
                    />
                    </div>
                </div>
                    <span>{this.props.placeData && this.props.placeData.formatted_address}</span>
                    <a href={telNum} style={{ display: 'block', textDecoration: 'underline', color: '#FFF'}}>{this.props.placeData && this.props.placeData.formatted_phone_number}</a>
                    <div>
                    {!this.state.hours && (this.props.placeData && this.props.placeData.opening_hours ? <p
                      style={{ cursor: 'pointer' }}
                      onClick={this.showHrs}>{openingHrsToday}<img alt='more hours' src='arrowDown.svg' className='vecStyle'/></p> : <p>Opening hours unavailable</p> )}
                    </div>
                    {this.state.hours &&
                      <div>
                      <p onClick={this.hideHrs}
                         style={{ cursor: 'pointer' }}><img alt='less hours' src='arrowUp.svg' className='vecStyle'/></p>
                        <div>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[0]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[1]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[2]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[3]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[4]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[5]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[6]}</p>
                        </div>
                      </div>}
                </div>
                  <div>
                    <span className='ratingsRow'>Wifi Quality
                    <AmenityRating
                      amenity={this.props.data.avgwifi}
                    /></span>
                    <span className='ratingsRow'>Noise Level
                    <AmenityRating
                      amenity={this.props.data.avgnoise}
                    /></span>
                    <span className='ratingsRow'>Seating
                    <AmenityRating
                      amenity={this.props.data.avgseating}
                    /></span>
                  {!this.state.features && <p onClick={this.showFeatures} style={{ float: 'right', textDecoration: 'underline', cursor: 'pointer' }}>more<img alt='more' src='arrowDown.svg' className='vecStyle'/></p>}
                  {this.state.features &&
                    <div>
                    <p onClick={this.hideFeatures} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', textDecoration: 'underline' }}>less<img alt='less' src='arrowUp.svg' className='vecStyle'/></p>
                    <div className='features' style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '14px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                          <p style={{ color: alcohol ? '#FFFFFF' : '#C4C4C4' }}>Beer + Wine</p>
                          <p style={{ color: coffee ? '#FFFFFF' : '#C4C4C4' }}>Coffee</p>
                          <p style={{ color: food ? '#FFFFFF' : '#C4C4C4' }}>Food</p>
                          <p style={{ color: freeParking ? '#FFFFFF' : '#C4C4C4' }}>Free Parking</p>
                        </div>
                        <div style={{ float: 'right', display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                          <p style={{ color: goodForGroups ? '#FFFFFF' : '#C4C4C4' }}>Good For Groups</p>
                          <p style={{ color: meetingSpace ? '#FFFFFF' : '#C4C4C4' }}>Meeting Rooms</p>
                          <p style={{ color: outdoorSpace ? '#FFFFFF' : '#C4C4C4' }}>Outdoor Space</p>
                          <p style={{ color: outlets ? '#FFFFFF' : '#C4C4C4' }}>Outlets</p>
                        </div>
                        <div style={{ float: 'right', display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                          <p style={{ color: petFriendly ? '#FFFFFF' : '#C4C4C4' }}>Pet Friendly</p>
                          <p style={{ color: quiet ? '#FFFFFF' : '#C4C4C4' }}>Quiet</p>
                          <p style={{ color: wifiPassword ? '#FFFFFF' : '#C4C4C4' }}>Wifi Password</p>
                        </div>
                        </div>
                      </div>
                    }
                </div>
                <br />
              <hr style={{ visibility: 'hidden', margin: '30px' }} />
                <div style={{ display: 'flex' }}>
                  <div><p style={{ margin: '0px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'normal' }}>Reviews({this.props.data.reviews.length})</p></div>
                </div>
                <br />

                <div>
                {this.props.data.reviews.map(review => (
                  <Review
                    user={review.user.email}
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
