import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Swipeable } from 'react-swipeable'
import Button from 'react-bootstrap/Button'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import StarRatingComponent from 'react-star-rating-component'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Review from '../Review/Review'
import AmenityRating from '../AmenityRating/AmenityRating.js'
import { showUser } from '../../api/auth'
import { getGooglePlaceDetails } from '../../helpers/googlePlaceDetails'

import './WorkSpace.scss'

const WorkSpace = ({
  history,
  match,
  setUser,
  user,
  userLocation,
  google,
  map,
  setApp,
  data,
  placeData
}) => {
  const [state, setState] = useState({
    showFeatures: false,
    showHours: false,
  })

  const refreshWorkspaceData = async (id) => {
    console.log('refresh workspace data')
    const { data } = await axios(`${apiUrl}work_spaces/${id}`)
    const { work_space } = data
    console.log({ data })
    const { place_id, lat, lng } = work_space
    const mapCenter = { lat, lng }
    setApp({ mapCenter, currentWorkspace: work_space })
    const setRefreshedData = (placeData) => {
      setApp(prevState => ({ ...prevState, placeData }))
    }
    getGooglePlaceDetails(google, map, place_id, setRefreshedData)
  }

  useEffect(() => {
    console.log('use effect')
    refreshWorkspaceData(match.params.id)
  }, [match.params.id, google])

  const toggleStateByKey = (key) => {
    setState(prevState => ({ ...prevState, [key]: !prevState[key] }))
  }

  if (!placeData) {
    return(<div>Loading...</div>)
  }

  const doesUserLike = user && user.find_up_voted_items.find(item => item.id === data.id) ? true : false

  // Register as favorited
  const toggleFavorite = () => {
    const route = doesUserLike ? 'unlike' : 'like'
    const { token } = user || {}
    axios({
      url: `${apiUrl}/work_spaces/${data.id}/${route}`,
      method: 'PUT',
      headers: {
        'Authorization': `Token token=${token}`
      }
    })
    .then(() => user && showUser(user))
    .then((res) => setUser(res.data.user))
  }

  const { photos, opening_hours = {}, formatted_address, formatted_phone_number} = placeData

  const loadingImage = 'loading-cat.gif'
  const defaultImages = [loadingImage, loadingImage, loadingImage, loadingImage, loadingImage]
  const displayImages = photos ? photos.map(photo => photo.getUrl()) : defaultImages

  const today = new Date().getDay()
  const dayKey = today ? today - 1 : 6
  const weekdayText = opening_hours.weekday_text || []
  const openingHrsToday = weekdayText[dayKey]
  const telNum = `tel:+${formatted_phone_number}`
  console.log({ weekdayText, today, dayKey, openingHrsToday, data, placeData })

  const alcohol = data.bool_alcohol
  const coffee = data.bool_coffee
  const food = data.bool_food
  const freeParking = data.bool_parking
  const goodForGroups = data.bool_goodforgroup
  const petFriendly = data.bool_petfriendly
  const meetingSpace = data.bool_meetingspace
  const outdoorSpace = data.bool_outdoorspace
  const outlets = data.bool_outlet
  const quiet = data.avgnoise <= 2
  const wifiPassword = data.bool_wifipass

  const config = {
    onSwipedDown: () => history.push('/'),
    delta: 250,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  };

  return (
    <Swipeable {...config}>
      <div className='workspace'>
        <Carousel className='carousel' showThumbs={false}>
          <div>
            <img src={displayImages[0]} alt='workspace 1'/>
          </div>
          <div>
            <img src={displayImages[1]} alt='workspace 2'/>
          </div>
          <div>
            <img src={displayImages[2]} alt='workspace 3'/>
          </div>
          <div>
            <img src={displayImages[3]} alt='workspace 4'/>
          </div>
          <div>
            <img src={displayImages[4]} alt='workspace 5'/>
          </div>
        </Carousel>

        <div className='buttonGroup'>
          <Button
            className='button-workspace'
            data={data && userLocation}
            href={userLocation ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat}%2c${userLocation.lng}&destination=${data.lat}%2c${data.lng}` : `https://www.google.com/maps/dir/?api=1&origin=${data.lat}%2c${data.lng}&destination=${data.lat}%2c${data.lng}`}
            target={'_blank'}
          >
            <img src='getDirections.svg' alt='directions'/>
            Get Directions
          </Button>
          <Button
            className='button-workspace'
            data={data.id}
            href={`#/create-review`}
          >
            <img src='leaveReview.svg' alt='leave a review'/>
            Leave a Review
          </Button>
          <Button
            className={`button-workspace ${doesUserLike && 'favorited'}`}
            data={data.id}
            onClick={toggleFavorite}
          >
            <img src={doesUserLike ? 'heartRed.svg' : 'heartBlue.svg'} alt='favorite'/>
            Add to Favorites
          </Button>
        </div>

        <div className='workspaceInfo'>
          <div className='nameAndStar'>
            <a
              className='workspaceLink'
              style={{ textDecoration: 'none', color: '#000', fontSize: '17px', fontWeight: '500', lineHeight: '150%' }}
              href={placeData.website}
              target='_blank'
              rel="noopener noreferrer"
            >
              {placeData.name}
            </a>
            <div className='starRating'>
              <StarRatingComponent
                name='average workspace rating'
                value={Math.floor(data.avgrating)}
                editing={false}
                renderStarIcon={(nextValue, prevValue) =>
                  (nextValue <= prevValue) ?
                    <img src='star-icon.svg' className='star' alt='star'/> :
                    <img src='star-icon-empty-gray.svg' className='star' alt='star'/>}
              />
            </div>
          </div>

          <span style={{ display: 'block'}}>{formatted_address}</span>
          <a href={telNum} className='telNum' style={{ display: 'block', textDecoration: 'underline', color: '#000', textDecorationColor: '#cbcbcb' }}>
            {formatted_phone_number}
          </a>
          <div onClick={() => toggleStateByKey('showHours')} style={{ cursor: 'pointer' }}>
            {!state.showHours && opening_hours ? (
              <div>
                {openingHrsToday}
                <img alt='more hours' src='arrowDown.svg' className='vecStyle'/>
              </div>
            ) : <div>Hide Opening Hours</div> }
          </div>
          {state.showHours && (
            <>
              <div onClick={() => toggleStateByKey('showHours')} style={{ cursor: 'pointer' }}>
                <img alt='less hours' src='arrowUp.svg' className='vecStyle'/>
              </div>
              <div>
                <p>{opening_hours.weekday_text[0]}</p>
                <p>{opening_hours.weekday_text[1]}</p>
                <p>{opening_hours.weekday_text[2]}</p>
                <p>{opening_hours.weekday_text[3]}</p>
                <p>{opening_hours.weekday_text[4]}</p>
                <p>{opening_hours.weekday_text[5]}</p>
                <p>{opening_hours.weekday_text[6]}</p>
              </div>
            </>
          )}

          <div style={{ marginTop: '35px' }}>
            <div className='ratingsRow'>
              Wifi Quality
              <AmenityRating amenity={data.avgwifi} />
            </div>
            <div className='ratingsRow'>
              Noise Level
              <AmenityRating amenity={data.avgnoise} />
            </div>
            <div className='ratingsRow'>
              Seating
              <AmenityRating amenity={data.avgseating} />
            </div>
            <div className='ratingsRow'>
              Cleanliness
              <AmenityRating amenity={data.avgclean} />
            </div>

            {state.showFeatures ? (
              <div>
                <p onClick={() => toggleStateByKey('showFeatures')} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', textDecoration: 'underline' }}>
                  less
                  <img alt='less' src='arrowUp.svg' className='vecStyle'/>
                </p>
                <div className='features' style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '14px', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                    <p style={{ textDecoration: alcohol ? 'none':'line-through' }}>{'Beer & Wine'}</p>
                    <p style={{ textDecoration: coffee ? 'none':'line-through' }}>Coffee</p>
                    <p style={{ textDecoration: food ? 'none':'line-through' }}>Food</p>
                    <p style={{ textDecoration: freeParking ? 'none':'line-through' }}>Free Parking</p>
                  </div>
                  <div style={{ float: 'right', display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                    <p style={{ textDecoration: goodForGroups ? 'none':'line-through' }}>Good For Groups</p>
                    <p style={{ textDecoration: meetingSpace ? 'none':'line-through' }}>Meeting Rooms</p>
                    <p style={{ textDecoration: outdoorSpace ? 'none':'line-through' }}>Outdoor Space</p>
                    <p style={{ textDecoration: outlets ? 'none':'line-through' }}>Outlets</p>
                  </div>
                  <div style={{ float: 'right', display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                    <p style={{ textDecoration: petFriendly ? 'none':'line-through' }}>Pet Friendly</p>
                    <p style={{ textDecoration: quiet ? 'none':'line-through' }}>Quiet</p>
                    <p style={{ textDecoration: wifiPassword ? 'none':'line-through' }}>Wifi Password</p>
                  </div>
                </div>
              </div>
            ) : (
              <div onClick={() => toggleStateByKey('showFeatures')} style={{ float: 'right', textDecoration: 'underline', cursor: 'pointer' }}>
                more
                <img alt='more' src='arrowDown.svg' className='vecStyle'/>
              </div>
            )}
          </div>

          <br />
          <hr style={{ visibility: 'hidden', margin: '30px' }} />

          <div style={{ display: 'flex' }}>
            <div style={{ margin: '0px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'normal' }}>
              Reviews ({data.reviews.length})
            </div>
          </div>

          <br />
          {data.reviews.map(review => (
            <Review
              user={review.username}
              avatar={review.avatar}
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
    </Swipeable>
  )
}

export default withRouter(WorkSpace)
