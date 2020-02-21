import React from 'react'

class TestComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }
    // render information inside an infoWindow for POI
    render() {
        return (
            <div>
                <h1>test component</h1>
                <p>{this.props.placeData.formatted_address}</p>
                <a rel="noopener noreferrer" href={'https://developers.google.com/maps/documentation/javascript/tutorial'} target={'_blank'}>
                  <button>display link to create a review</button>
                </a>
                <p>{this.props.placeData.place_id}</p>
            </div>
        )
    }
}

export default TestComponent
