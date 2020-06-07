import React from 'react'
import { withRouter } from 'react-router-dom'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import PlacesDetail from '../PlacesDetail/PlacesDetail'
// import SuggestionsList from './SuggestionsList/SuggestionsList.js'
import './GoogleMap.scss'


class GoogleMap extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedMarker: null,
            showWindow: false,
            allData: [],
        }
    }

    // Using geolocation from browser to location user location
    componentDidMount = () => {
      this.props.setApp({ mapCenter: { lat: 42.3601, lng: -71.0589 } })
      if(navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
        // console.log('found user location')
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

    placeDetails = ['name', 'website', 'formatted_phone_number', 'formatted_address', 'photo', 'reference', 'reviews', 'opening_hours', 'utc_offset_minutes', 'address_components']

    setPlaceData = placeData => {
        this.props.setApp({ placeData })
    }

    getPlaceDetails = (map, placeId) => {
        const fields = this.placeDetails
        const service = new this.props.google.maps.places.PlacesService(map)
        service.getDetails({ placeId, fields }, this.setPlaceData)
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

    // onClose handler for InfoWindow
    onInfoWindowClose = () => this.setState({ showWindow: false })

    navigateHome = () => {
        // unless already '/' navigate to '/'
        if (this.props.location.pathname !== '/') {
            this.props.history.push('/')
        }
        // close infowindow (if open)
        if (this.state.showWindow) {
            this.setState({ showWindow: false })
        }
    }

    findExistingWorkspace = placeId => {
        const dataId = this.props.allData.findIndex(workspace => workspace.place_id === placeId)
        if (dataId >= 0) {
            this.props.setApp({ currentWorkspace: this.props.allData[dataId]})
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

    showSuggestions = () => {
      this.props.history.push('/suggestions')
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
            <Map google={this.props.google}
                center={this.props.center}
                initialCenter={this.props.center}
                zoom={14}
                clickableIcons={true}
                options={{gesturHandling: 'greedy'}}
                onClick={this.handleClick}
                onCenter_changed={this.updateMapState}
                onMouseover={this.updateMapState}
                className='google-map'
            >

            <Marker
                name={'user location'}
                position={this.userLocation}
                icon={{url:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}}
            />

            <Marker
                name={'search result'}
                position={this.props.searchLocation}
                icon={{url:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}}
                onClick={this.showSuggestions}
            />

            {/* create a marker on the map for each workspace */}
            {this.props.allData.map(workSpace => (
                <Marker
                    key={workSpace.id}
                    onClick={this.onMarkerClick}
                    position={{ lat: workSpace.lat, lng: workSpace.lng}}
                    placeId={workSpace.placeId}
                    data={workSpace}
                    name={'Current location'}
                    icon={currentWorkspace && workSpace === currentWorkspace ? 'logo-bull-icon-active.svg' : 'logo-bull-icon.svg'}
                />
            ))}

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
  })(withRouter(GoogleMap))
