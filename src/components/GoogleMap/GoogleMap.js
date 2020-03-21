import React from 'react'
import { withRouter } from 'react-router-dom'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

import axios from 'axios'
import apiUrl from '../../apiConfig'

// import PlacesDetail from '../PlacesDetail/PlacesDetail'
import './GoogleMap.scss'


class GoogleMap extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedMarker: null,
            showWindow: false,
            allData: [],
            showPOI: false
        }
    }

    // Using geolocation from browser to location user location
    componentDidMount = () => {
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

    placeDetails = ['name', 'website', 'formatted_phone_number', 'formatted_address', 'photo', 'reference', 'reviews', 'opening_hours']

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
        this.setState({ selectedMarker: marker, showWindow: true })
        this.props.setApp({ currentWorkspace: marker.data, placeData: null })
        this.setNewLocation({ lat, lng }, placeId)
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
        if (this.state.showPOI) {
            this.setState({ showPOI: false })
        }
    }

    handlePOI = (map, event) => {
        const placeId = event.placeId
        const poiLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        const mapCenter = poiLocation
        // turn infoWindow on and immediately off
        this.setState({ showPOI: true })
        this.setState({ showPOI: false })
        // center the map, set poiLocation and poi placeId
        this.props.setApp({ mapCenter, poiLocation, placeId })

        this.getPlaceDetails(map, placeId)
        this.props.history.push('/create-workspace')
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

    render() {
        return (
            <Map google={this.props.google}
                center={this.props.center}
                initialCenter={this.props.center}
                zoom={14}
                clickableIcons={true}
                onClick={this.handleClick}
                className='google-map'
            >

            {/* info window to overwrite default poi locations */}
            <InfoWindow
                position={this.props.poiLocation}
                visible={this.state.showPOI}
            />

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
                />
            ))}

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
  })(withRouter(GoogleMap))
