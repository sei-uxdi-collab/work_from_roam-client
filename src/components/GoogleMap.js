import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import TestComponent from './TestComponent'
import PlacesDetail from './PlacesDetail'
// import TestButton from './TestButton'


class GoogleMap extends React.Component {
    constructor() {
        super()
        this.state = {
            placeData: null,
            poiLocation: null,
            selectedMarker: null,
            showPoiWindow: true,
            showMarker: false,
            showWindow: false,
            userLocation: '',

        }
    }

    // Using geolocation from browser to location user location
    componentDidMount = () => {
      if(navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
        console.log('found user location')
        const coords = pos.coords
        const lat = coords.latitude
        const lng = coords.longitude
        this.setState({ userLocation: { lat, lng },
                        showMarker: true })
                      })
      }
    }

      // onClick handler to set marker to state and show corresponding info window
    onMarkerClick = (props, marker, event) => {
        this.setState({ selectedMarker: marker, showWindow: true })
    }

    // onClose handler for InfoWindow
    onInfoWindowClose = () => {
        this.setState({ showWindow: false })
    }

    showPOI = (map, event) => {
        // declare function to handle data returned from service.getDetails()
        const handleData = (data, status) => {
            console.log(data)
            // save data from places details to state.placeData
            this.setState({placeData: data})
        }

        // save the click location and reset place data

        this.setState({
            poiLocation: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            userLocation: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            placeData: null
        })
        // create new instance of class PlacesService to access google places api
        const service = new this.props.google.maps.places.PlacesService(map)
        console.log('service is:', service)

        // call getDetails from google places api, passing placeId, fields to get data for, and above callback function to handle the response
        service.getDetails(
            {
                placeId: event.placeId,
                fields: ['name', 'website', 'formatted_phone_number', 'formatted_address', 'photo', 'reference', 'reviews']
            },
            handleData
        )
    }

    handleClick = (props, map, event) => {
        // if click event has a place id, get details on place and save data to state
        if(event.placeId) {
            // first save the location and place id to state. Clear data for place image and place data
            this.showPOI(map, event)
        }
    }

    render() {

        return (
            <Map google={this.props.google}
             center={this.state.userLocation}
             initialCenter={this.props.initialCenter}
             zoom={14}
             clickableIcons={true}

             onClick={this.handleClick}
            >

                {/* info window for poi locations */}
                <InfoWindow
                    position={this.state.poiLocation}
                    visible={true}
                >
                    <PlacesDetail placeData={this.state.placeData} />
                </InfoWindow>

                {/* Marker needs a position prop to render, initially undefined
                    User search sets the coordinates and passed down as props.coordinates */}
                <Marker onClick={this.onMarkerClick}
                    position={this.state.userLocation}
                    name={'Current location'}
                />

                {/* InfoWindow becomes visible when this.state.showWindow === true */}
                <InfoWindow marker={this.state.selectedMarker}
                        position={this.props.coordinates}
                        visible={this.state.showWindow}
                        onClose={this.onInfoWindowClose}
                >
                    {/* Display placeData information inside InfoWindow */}
                    <TestComponent placeData={this.props.placeData} />

                </InfoWindow>

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
  })(GoogleMap)
