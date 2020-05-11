import React from 'react'
import { StarRating } from './StarsRating'
import './Review.scss'

function Review (props) {

  // Placeholder pic for now. Can either use limited set of avatars later or user-uploaded photo
  // depending on how we want to implement the user profile feature
  let userPic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    return (
        <div>
        <img alt='User profile pic' src={userPic} className='userPic'/>
        <div className='stars'>
        <StarRating
          value={props.rating}
          emptyStarColor={'#4775FF'}
          editing={false}
        />
        </div>
        <p className='userName'><span title={props.user}>{props.user}</span></p>
        {}
        {props.note ? <p className='userNotes'>{props.note}</p>:<p className='userNotes empty'>This reviewer did not leave a comment.</p>}
        </div>
    )
}

export default Review
