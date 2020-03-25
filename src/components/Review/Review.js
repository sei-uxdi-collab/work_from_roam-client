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
      // Placeholder pic for now. Can either use limited set of avatars later or user-uploaded photo
      // depending on how we want to implement the user profile feature
      let userPic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
        return (
            <div>
            <img alt='User profile pic' src={userPic} style={{ width: '60px', height: '60px', borderRadius:'10px', float: 'left'}}/>
            <p>{this.props.user}   Stars here({this.props.rating})</p>
            <div style={{ padding: '5px' }}>
            <p>{this.props.note}</p>
            </div>
            </div>
        )
    }
}

export default Review
