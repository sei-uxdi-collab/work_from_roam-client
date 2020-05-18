import React from 'react'
import './AmenityRating.scss'

const AmenityRating = ({ amenity }) => {

  let amenityAvg = Math.floor(amenity)

  const yellowTick = (
        <div className='yellowBubble'></div>
      )


  const grayTick = (
        <div className='grayBubble'></div>
      )


  return (
     <div>
       {Array(amenityAvg).fill(yellowTick)}
       {Array(5 - amenityAvg).fill(grayTick)}
     </div>
  )
}

export default AmenityRating
