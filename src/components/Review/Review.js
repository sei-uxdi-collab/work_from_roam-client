import React from 'react'

class Review extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            test: true
        }
    }

    // render information inside an infoWindow for POI
    //
    render() {

        return (
            <div>
              <p>Rating: {this.props.rating}</p>
              <p>Noise: {this.props.noise}</p>
              <p>Bathroom: {this.props.bathroom}</p>
              <p>Wifi: {this.props.wifi}</p>
              <p>Food: {this.props.food}</p>
              <p>Coffee: {this.props.coffee}</p>
              <p>Seating: {this.props.seating}</p>
              <p>Outlets: {this.props.outlet}</p>
              <p>Note: {this.props.note}</p>
              <p>Workspace ID: {this.props.work_space_id}</p>
            </div>
        )
    }
}

export default Review
