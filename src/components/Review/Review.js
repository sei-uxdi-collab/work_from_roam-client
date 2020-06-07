import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { avatar } from '../../helpers/avatarsArray'
import './Review.scss'

function Review (props) {

  let userPic = avatar(25)
  if (props.avatar) {
    userPic = avatar(props.avatar)
  }
    return (
        <div>
        <button className='userPicContainer'>
          <img alt='User profile pic' src={userPic} className='userPic'/>
        </button>
        <div className='nameStar'>
        <p className='userName'><span title={props.user}>{props.user}</span></p>
        <div className='starsReview'>
        <StarRatingComponent
          value={props.rating}
          editing={false}
          renderStarIcon={(nextValue, prevValue) =>
            (nextValue <= prevValue) ?
              <img src='star-icon.svg' className='star' alt='star'/> :
              <img src='star-icon-empty.svg' className='star emptyStar' alt='star'/>}
        />
        </div>
        </div>
        {props.note ? <p className='userNotes'>{props.note}</p>:<p className='userNotes emptyNotes'>This reviewer did not leave a comment.</p>}
        </div>
    )
}

export default Review
