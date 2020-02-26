import React from 'react'
import { Link } from 'react-router-dom'
import './WorkSpace.css'
import Review from '../Review/Review'


class WorkSpace extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }

    // render information inside an infoWindow for POI
    //
    render() {
      let photo = '../../loading-cat.gif'
      if (this.props.placeData && this.props.placeData.photos) {
        photo = this.props.placeData.photos[0].getUrl()
      }
        return (
            <div className='workspace' style={this.state.display}>
              <Link to='/'>
                <button style={{float: 'right'}}>Close</button>
              </Link>
              <h1>{this.props.placeData && this.props.placeData.name}</h1>
              <img accept="*/*" height='200px' src={photo} />
              <br />
              <a href={this.props.placeData && this.props.placeData.website} target='_blank'>visit website</a>
              {this.props.data.reviews.map(review => (
                <Review rating={review.rating} note={review.note} />
              ))}
            </div>
        )
    }
}

export default WorkSpace
