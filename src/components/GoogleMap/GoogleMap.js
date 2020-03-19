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
            showPOI: false
        }
    }

    // Using geolocation from browser to location user location
    componentDidMount = () => {
      if(navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
        // console.log('found user location')
        const coords = pos.coords
        const lat = coords.latitude
        const lng = coords.longitude
        this.props.setApp({ userLocation: { lat, lng },
                            mapCenter: { lat, lng } })
        })
      }
      axios(apiUrl + '/work_spaces')
        .then(data => {
            // console.log(data)
            this.props.setApp({ allData: data.data.work_spaces })
        })
    }

    placeDetails = ['name', 'website', 'formatted_phone_number', 'formatted_address', 'photo', 'reference', 'reviews']

    setPlaceData = placeData => {
        this.props.setApp({ placeData })
    }

    getPlaceDetails = (map, placeId) => {
        const fields = this.placeDetails
        const service = new this.props.google.maps.places.PlacesService(map)
        service.getDetails({ placeId, fields }, this.setPlaceData)
    }

    onMarkerClick = (props, marker, event) => {
        const location = { lat: props.data.lat, lng: props.data.lng }
        const placeId = marker.data.place_id
        // set App state with workspace data and location
        this.props.setApp({
            currentWorkspace: marker.data,
            placeData: null,
            poiLocation: location,
            mapCenter: location,
            placeId
        })
    }

      // onClick handler to set marker to state and show corresponding info window
    onMarkerClick = (props, marker, event) => {
        const lat = props.data.lat
        const lng = props.data.lng
        const placeId = marker.data.place_id
        this.setState({ selectedMarker: marker, showWindow: true })
        this.props.setApp({ currentWorkspace: marker.data, placeData: null })
        this.setNewLocation({ lat, lng }, placeId)
        this.getPlaceDetails(props.map, placeId)
        // navigate to '/workspace' to render the component
        this.props.history.push('/workspace')
    }

    // onClose handler for InfoWindow
    onInfoWindowClose = () => {
        this.setState({ showWindow: false })
    }

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

    handleClick = (props, map, event) => {
        // if user clicks on a point of interest (poi)
        if(event.placeId) {
            // turn infoWindow on and immediately off
            this.setState({ showPOI: true })

            // first center the map using setApp and event coordinates
            this.props.setApp({
                mapCenter: { lat: event.latLng.lat(), lng: event.latLng.lng() },
                poiLocation: { lat: event.latLng.lat(), lng: event.latLng.lng() },
                placeId: event.placeId
            })

            // trigger get places detail from google places api
            this.getPlaceDetails(map, event.placeId)


            // navigate to '/create-workspace'
            this.props.history.push('/create-workspace')


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
