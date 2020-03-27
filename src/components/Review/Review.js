import React from 'react'
import { StarRating } from './StarsRating'

const userPicStyle = {
  width: '60px',
  height: '60px',
  borderRadius:'10px',
  float: 'left'
}

const userNameStyle = {
  padding: '7px',
  margin: '10px',
  fontFamily: 'Roboto',
  fontSize: '16px',
  lineHeight: '150%'
}

const userNotesStyle = {
  position: 'static',
  padding: '11px 0px 5px 78px',
  margin: '1px',
  height: '60px',
  left: '0px',
  top: '32px',
  fontFamily: 'Roboto',
  fontWeight: '300',
  fontSize: '13px',
  lineHeight: '150%'
}

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }

    render() {
      // Placeholder pic for now. Can either use limited set of avatars later or user-uploaded photo
      // depending on how we want to implement the user profile feature
      let userPic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
        return (
            <div>
            <img alt='User profile pic' src={userPic} style={userPicStyle}/>
            <div style={{ float: 'right', paddingRight: '80px' }}>
            <StarRating
              value={this.props.rating}
              emptyStarColor={'#4775FF'}
              editing={false}
            />
            </div>
            <span style={userNameStyle}>{this.props.user}</span>
            <div style={userNotesStyle}>
            <p>{this.props.note}</p>
            </div>
            </div>
        )
    }
}

export default Review
