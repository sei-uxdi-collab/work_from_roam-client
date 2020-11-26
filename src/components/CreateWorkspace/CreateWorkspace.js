import React from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Button } from 'react-bootstrap'

const CreateWorkspace = ({ placeData }) => {
  
  return placeData ? (
    <div className='userAlertCard'>
      <div className='cardContent'>
        <Row>
          <span className='name'>{placeData && placeData.name}</span>
        </Row>
        <Row>
          <span className='address'>{placeData && placeData.formatted_address}</span>
        </Row>
        <div className='hrsRow'>
          {placeData && placeData.opening_hours ? <p className='hours'>{placeData.openingHrsToday}</p> : <p className='hours'>Hours unavailable</p> }

            {placeData && placeData.opening_hours && placeData.opening_hours.isOpen() ? <span className='now open'>Open Now</span> : <span className='now close'>Closed Now</span>}
        </div>
        <Row>
          <span className='message'>Found a hidden gem? Share it with everyone!</span>
        </Row>
        </div>
        <Row>
        <Button
          className='review'
          href={`#/create-review`}
          >
          Leave the first review
        </Button>
      </Row>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default withRouter(CreateWorkspace)
