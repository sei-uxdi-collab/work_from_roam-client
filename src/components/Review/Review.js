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
        return (
            <div style={{ borderStyle: 'double'}}>
            <p>{this.props.user}: Stars here{this.props.rating}</p>
              <p>{this.props.note}</p>
            </div>
        )
    }
}

export default Review
