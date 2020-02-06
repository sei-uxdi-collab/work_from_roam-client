import React from 'react';
import '../App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import TestComponent from './TestComponent'
import Search from './Search'
import GoogleMap from './GoogleMap';

class App extends React.Component {
constructor() {
  super()
  this.state = {
    center: '',
    coordinates: {
      lat: null,
      lng: null
    },
    placeData: '',
    userLocation: { lat: 42.3601, lng: -71.0589}
  }
}

render() {
  return (
    <div className="App">
        <Search setApp={this.setState.bind(this)}/>

        <GoogleMap 
          placeData={this.state.placeData}
          center={this.state.coordinates}
          initialCenter={this.state.userLocation}
          coordinates={this.state.coordinates}
        />
        
    </div>
  )
}
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(App)
