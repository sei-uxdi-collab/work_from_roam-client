import React from 'react'
import { withRouter } from 'react-router-dom'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import { getGooglePlaceDetails } from '../../helpers/googlePlaceDetails'

import './GoogleMap.scss'
import { greyscale } from '../MapStyles'


class GoogleMap extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedMarker: null,
    }
  }

  // Using geolocation from browser to location user location
  componentDidMount = () => {
    this.props.setApp({ mapCenter: { lat: 42.3601, lng: -71.0589 } })
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const userLocation = { lat, lng }
        const mapCenter = userLocation
        this.props.setApp({ userLocation, mapCenter })
      })
    }
    axios(apiUrl + '/work_spaces')
      .then(data => {
        // console.log(data)
        this.props.setApp({ allData: data.data.work_spaces })
      })
  }

  getPlaceDetails = (map, placeId) => {
    const callback = placeData => this.props.setApp({ placeData })
    getGooglePlaceDetails(this.props.google, map, placeId, callback)
  }

  onMarkerClick = (props, marker, event) => {
    const currentWorkspace = marker.data
    const poiLocation = { lat: props.data.lat, lng: props.data.lng }
    const mapCenter = poiLocation
    const placeId = marker.data.place_id
    // set App state with workspace data and location
    this.props.setApp({ placeData: null, currentWorkspace, poiLocation, mapCenter, placeId })
    // get and set google place data
    this.getPlaceDetails(props.map, placeId)
    // navigate to '/workspace' to render the component
    this.props.history.push('/workspace')
  }

  navigateHome = () => {
    // unless already '/' navigate to '/'
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  findExistingWorkspace = placeId => {
    const dataId = this.props.allData.findIndex(workspace => workspace.place_id === placeId)
    if (dataId >= 0) {
      this.props.setApp({ currentWorkspace: this.props.allData[dataId] })
    }
  }

  handlePOI = (map, event) => {
    this.props.setApp({ placeData: null, currentWorkspace: null })
    const placeId = event.placeId
    const poiLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() }
    const mapCenter = poiLocation

    this.findExistingWorkspace(placeId)

    this.props.setApp({ mapCenter, poiLocation, placeId })

    this.getPlaceDetails(map, placeId)
    this.props.history.push('/workspace')
  }

  handleClick = (props, map, event) => {
    // if user clicks on a point of interest (poi)
    if (event.placeId) {
      this.handlePOI(map, event)
    } else {
      this.navigateHome()
    }
  }

  // Google marker on searched result
  handleMarkerPOI = (props, marker, event) => {
    console.log(props)
    console.log(event)
    console.log(marker)
    this.props.setApp({ placeData: null, currentWorkspace: null })
    const placeId = marker.placeId
    const poiLocation = { lat: props.position.lat, lng: props.position.lng }
    const mapCenter = poiLocation

    this.findExistingWorkspace(placeId)

    this.props.setApp({ mapCenter, poiLocation, placeId })

    this.getPlaceDetails(props.map, placeId)
    this.props.history.push('/workspace')
  }

  // Google marker on searched result
  handleMarkerClick = (props, map, event) => {
    // if user clicks on marker
    if (props.placeId) {
      this.handleMarkerPOI(props, map, event)
    } else {
      this.navigateHome()
    }
  }

  updateMapState = (props, map, event) => {
    if (!this.props.google || !this.props.map) {
      const { google } = this.props
      this.props.setApp({ map, google })
    }
  }

  render() {
    const { currentWorkspace } = this.props
    return (
      <Map
        google={this.props.google}
        center={this.props.center}
        initialCenter={this.props.center}
        zoom={14}
        clickableIcons={true}
        options={{ gestureHandling: 'greedy' }}
        onClick={this.handleClick}
        onCenter_changed={this.updateMapState}
        className='google-map'
        styles={greyscale}
      >

        <Marker
          name={'user location'}
          position={this.props.userLocation}
          icon='current-location-marker.svg'
        />

        {this.props.searchLocation && (<Marker
          name={'search result'}
          position={this.props.searchLocation}
          onClick={this.handleMarkerPOI}
          placeId={this.props.placeId}
        />)}

        {/* create a marker on the map for each workspace */}
        {this.props.allData.map(workSpace => (
          <Marker
            key={workSpace.id}
            onClick={this.onMarkerClick}
            position={{ lat: workSpace.lat, lng: workSpace.lng }}
            placeId={workSpace.placeId}
            data={workSpace}
            name={`workspace_${workSpace.id}`}
            icon={workSpace === currentWorkspace ? 'logo-bull-icon-active.svg' : 'logo-bull-icon.svg'}
          />
        ))}

      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(withRouter(GoogleMap))
