import React from 'react'

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }

    // render information inside an infoWindow for POI
    render() {
console.log(this.props)
        return (
            <div style={{ borderStyle: 'double'}}>
            <p>User:  Rating: {this.props.rating}</p>
              <p>Note: {this.props.note}</p>
            </div>
        )
    }
}

export default Review
