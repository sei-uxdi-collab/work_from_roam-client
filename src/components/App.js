import React from 'react';
import '../App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import TestComponent from './TestComponent'
import Search from './Search'

class App extends React.Component {
constructor() {
  super()
  this.state = {
    center: '',
    coordinates: {
      lat: null,
      lng: null
    },
    selectedMarker: null,
    placeData: '',
    showWindow: false,
    userLocation: { lat: 42.3601, lng: -71.0589}
  }
}

// set Marker data to state and show InfoWindow
  // InfoWindow will display data from Marker state
onMarkerClick = (props, marker, event) => {
  this.setState({ selectedMarker: marker })
  this.setState({ showWindow: true })
}

// close InfoWindow
onInfoWindowClose = () => {
  this.setState({ showWindow: false })
}

render() {
  return (
    <div className="App">
        <Search setApp={this.setState.bind(this)}/>

        <Map google={this.props.google}
             center={this.state.coordinates}
             initialCenter={this.state.userLocation}
             zoom={14}
             clickableIcons={true}
        >

          <Marker onClick={this.onMarkerClick}
                  position={this.state.coordinates}
                  name={'Current location'}
          />

          <InfoWindow marker={this.state.selectedMarker}
                      position={this.state.coordinates}
                      visible={this.state.showWindow}
                      onClose={this.onInfoWindowClose}
          >
              <div>
                <h1>{this.state.query}</h1>
                <p>{this.state.placeData.formatted_address}</p>
                <a href={'https://developers.google.com/maps/documentation/javascript/tutorial'} target={'_blank'}>
                  <button>display link to create a review</button>
                </a>
                <TestComponent placeData={this.state.placeData} />
              </div>
          </InfoWindow>
        </Map>
    </div>
  )
}
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(App)
