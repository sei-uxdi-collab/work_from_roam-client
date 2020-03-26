import React from 'react'
import { StarRating } from './StarsRating'

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }

    // render information inside an infoWindow for POI
    render() {
      // Placeholder pic for now. Can either use limited set of avatars later or user-uploaded photo
      // depending on how we want to implement the user profile feature
      let userPic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
        return (
            <div>
            <img alt='User profile pic' src={userPic} style={{ width: '60px', height: '60px', borderRadius:'10px', float: 'left' }}/>
            <div style={{ float: 'right', paddingRight: '105px' }}>
            <StarRating
              value={this.props.rating}
              emptyStarColor={'#4775FF'}
              editing={false}
            />
            </div>
            <span style={{ padding: '10px', margin: '10px', fontSize: '16px', lineHeight: '150%' }}>{this.props.user}</span>
            <div style={{ position: 'static',
                          padding: '10px 10px 10px 80px',
                          margin: '1px',
                          height: '60px',
                          left: '0px',
                          top: '32px',
                          fontWeight: '300',
                          fontSize: '13px',
                          lineHeight: '150%' }}>
            <p>{this.props.note}</p>

            </div>
            </div>
        )
    }
}

export default Review
