import React from 'react';
import '../App.css';
import Search from './Search'
import GoogleMap from './GoogleMap';
import ReviewForm from './ReviewForm';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
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
          <ReviewForm />
          <Search setApp={this.setState.bind(this)}/>

          <GoogleMap
            initialCenter={this.state.userLocation}
            coordinates={this.state.coordinates}
            placeData={this.state.placeData}
          />

      </div>
    )
  }
}

export default App
