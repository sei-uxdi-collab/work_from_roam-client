import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import TestComponent from './TestComponent'
import PlacesDetail from './PlacesDetail'
import axios from 'axios'
import apiUrl from '../apiConfig'


class GoogleMap extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedMarker: null,
            showWindow: false,
            allData: []
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
        this.props.setApp({ mapCenter: { lat, lng }})
        })
      }
      axios(apiUrl + '/work_spaces')
        .then(data => {
            console.log(data)
            this.setState({ allData: data.data.work_spaces })
        })
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
            this.props.setApp({placeData: data})
        }

        // save the click location and reset place data

        this.props.setApp({
            poiLocation: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            mapCenter: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            placeData: null,
            placeId: event.placeId
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
             center={this.props.center}
             initialCenter={this.props.center}
             zoom={14}
             clickableIcons={true}

             onClick={this.handleClick}
            >

                {/* info window for poi locations */}
                <InfoWindow
                    position={this.props.poiLocation}
                    visible={true}
                >
                    <PlacesDetail placeData={this.props.placeData} />
                </InfoWindow>

                {this.state.allData.map(workSpace => (
                    <Marker onClick={this.onMarkerClick}
                        position={{ lat: workSpace.lat, lng: workSpace.lng}}
                        placeId={workSpace.placeId}
                        data={workSpace}
                        name={'Current location'}
                    />
                ))}
                

                {/* InfoWindow becomes visible when this.state.showWindow === true */}
                <InfoWindow marker={this.state.selectedMarker}
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
