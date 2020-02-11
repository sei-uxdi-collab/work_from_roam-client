import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import TestComponent from './TestComponent'
import TestButton from './TestButton'


class GoogleMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showWindow: false,
            selectedMarker: null,
            showPoiWindow: true,
            clickLocation: null,
            poiPlaceId: '',
            placeData: null,
            placeImage: ''
        }
    }

    componentDidMount() {
        console.log(this.props.google)
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
            // if data includes photos, set photo[0] to state, otherwise set 'image not found' image to state
            if (data.photos) {
                this.setState({ placeImage: data.photos[0].getUrl() })                    
            } else {
                this.setState({
                    placeImage: this.imageNotFound
                })
            }
        }

        // save the click location and placeID to state. Reset image and place data
        // this will display the info window with no image or place data
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        this.setState({
            poiPlaceId: event.placeId,
            clickLocation: { lat, lng },
            placeImage: '',
            placeData: null
        })

                
        // create new instance of class PlacesService to access google places api
        const service = new this.props.google.maps.places.PlacesService(map)
        console.log('service is:', service)

        // call getDetails from google places api, passing placeId, fields to get data for, and above callback function to handle the response
        service.getDetails(
            {
                placeId: event.placeId,
                fields: ['name', 'website', 'formatted_phone_number', 'formatted_address', 'photo', 'reference']
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

    imageNotFound = 'https://1m19tt3pztls474q6z46fnk9-wpengine.netdna-ssl.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png'

    render() {
        const attribution = this.state.htmlAttribution
        return (
            <Map google={this.props.google}
             center={this.props.coordinates}
             initialCenter={this.props.initialCenter}
             zoom={14}
             clickableIcons={true}

             onClick={this.handleClick}
            >            
                {/* Marker needs a position prop to render, initially undefined 
                    User search sets the coordinates and passed down as props.coordinates */}
                <Marker onClick={this.onMarkerClick}
                    position={this.props.coordinates}
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
                <InfoWindow
                        position={this.state.clickLocation}
                        visible={true}
                        onClose={this.onInfoWindowClose}
                >
                    <img height={'200px'} src={this.state.placeImage} />
                    
                    {this.state.placeData && <h1>{this.state.placeData.name}</h1>}
                    <p><strong>google place_id: </strong>{this.state.poiPlaceId}</p>

                    <TestButton placeId={this.state.poiPlaceId}/>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
  })(GoogleMap)