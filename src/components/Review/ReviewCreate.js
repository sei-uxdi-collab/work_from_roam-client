import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import ReviewForm from './ReviewForm.js'

const ReviewCreate = props => {
  const [review, setReview] = useState({ work_space_id: '', name: '', description: '', vote: '0' })
  review.subject_id = props.match.params.id

  const handleChange = event => {
    event.persist()
    setReview({ ...review, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/reviews`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { review }
    })
      .catch(console.error)
  }

  return (
    <div className="review-board">
      <ReviewForm
        props={props}
        review={review}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </div>
  )
}

export default withRouter(ReviewCreate)
