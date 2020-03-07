import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

// import './Subject.scss'

const Reviews = props => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/reviews`,
      method: 'GET'
    })
      .then(response => {
        setReviews(response.data.reviews)
        console.log(response.data.reviews)
      })
      .catch(console.error)
  }, [])

  const reviewsJsx = reviews.map(review => (
    <div className='homepage' key={review.id}>
      {<Col lg={3} xs={3} md={3}>
        <Button style={{ backgroundColor: '#fae4ad' }} as={'a'} href={`#/reviews/${review.id}`}><div className="menu-item">
          <div className='content'>
            <h1 className="title">{review.note}</h1>
            <p className='subtitle'>Creator:</p>
          </div>
        </div></Button>
      </Col>}
    </div>
  ))

  return (
    <div className="page-content">
      <div style={{ textAlign: 'center' }}>
        <h1>Reviews</h1>
        <p>Add a choice to a Poll or cast a vote!</p>
      </div>
      <div className='directory-menu'>
        <Container>
          <Row className="box">
            {reviewsJsx}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Reviews
