import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import TestComponent from './TestComponent'

class GoogleMap extends React.Component {
    constructor() {
        super()
        this.state = {
            showWindow: false,
            showMarker: false,
            selectedMarker: null,
            userLocation: ''
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

    render() {
        return (
            <Map google={this.props.google}
             center={this.props.coordinates}
             initialCenter={this.props.initialCenter}
             zoom={14}
             clickableIcons={true}
            >

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
