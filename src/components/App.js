import React from 'react';
import '../App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import TestComponent from './TestComponent'

class App extends React.Component {
constructor() {
  super()
  this.state = {
    center: '',
    coordinates: {
      lat: null,
      lng: null
    },
    query: '',
    selectedMarker: null,
    placeData: '',
    showWindow: false,
    userLocation: { lat: 42.3601, lng: -71.0589}
  }
}

// set query to find Place data
setQuery = query => {
  this.setState({ query })
}

// send query to find Place data
  // use Place data to get coordinates
  // update state with coordinates and Place data
handleAutocompleteSelect = async query => {
  const results = await geocodeByAddress(query)
  const coordinates = await getLatLng(results[0])
  this.setState({ coordinates })
  this.setState({ placeData: results[0] })
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
        <PlacesAutocomplete
          value={this.state.query}
          onChange={this.setQuery}
          onSelect={this.handleAutocompleteSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              style={{ height: '40px', width: '100%', fontSize: '16px' }}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        </PlacesAutocomplete>

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
