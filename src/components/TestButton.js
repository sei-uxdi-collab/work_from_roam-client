import React from 'react'
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'

class TestButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }

    componentDidMount() {
        geocodeByPlaceId(this.props.placeId)
            .then(console.log)
    }

    url = 'http://localhost:3000'

    executeTest = () => {
        console.log('test button')
    }

    // render information inside an infoWindow for POI
    render() {
        return (
            <a href={`${this.url}/new/${this.props.placeId}`}>
                <button>Add a Review</button>
            </a>
            
        )
    }
}

export default TestButton