import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import TestComponent from './TestComponent'

class GoogleMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showWindow: false,
            selectedMarker: null
        }
    }

    // componentDidMount() {
    //     console.log(this.props)
    // }

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
            <Map google={this.props.google}
             center={this.props.center}
             initialCenter={this.props.initialCenter}
             zoom={14}
             clickableIcons={true}
        >

          <Marker onClick={this.onMarkerClick}
                  position={this.props.coordinates}
                  name={'Current location'}
          />

          <InfoWindow marker={this.state.selectedMarker}
                      position={this.props.coordinates}
                      visible={this.state.showWindow}
                      onClose={this.onInfoWindowClose}
          >
              <div>
                <TestComponent placeData={this.props.placeData} />
              </div>
          </InfoWindow>
        </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
  })(GoogleMap)