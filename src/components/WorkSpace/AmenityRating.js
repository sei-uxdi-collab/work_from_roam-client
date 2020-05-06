/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'

const AmenityRating = ({ amenity, amenityName }) => {

  const [amenityCount, setAmenityCount] = useState([])

  useEffect(() => {
    setAmenityCount(Math.floor(amenity))
  }, [amenity])

  const yellowTick = () => {
      return (
        <div css={yellowBubble}></div>
      )
  }

  const grayTick = () => {
      return (
        <div css={grayBubble}></div>
      )
  }

  return (
   <div>
   <div css={ratingsRow}>
     <p>{amenityName}</p>
     <div>
       {Array(amenityCount).fill().map(item => yellowTick())}
       {Array(5 - amenityCount).fill().map(item => grayTick())}
     </div>
   </div>
   </div>
  )
}

const ratingsRow = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  @media (max-width:320px) {
    margin: 5px 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 5px 0px;
  }
  p {
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    font-weight: 300;
    margin: 0;
    text-align: left;
    width: 80px;
  };
  div {
    align-items: center;
    display: flex;
  }
`

const yellowBubble = css`
  background: #ffcc47;
  border-radius: 20px;
  display: inline-block;
  height: 10px;
  margin: 0 6px;
  padding: 0;
  width: 40px;
  @media (max-width:320px) {
    height: 8px;
    margin: 0 2px;
    width: 24px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    height: 8px;
    margin: 0 2px;
    width: 24px;
  }
`

const grayBubble = css`
  background: #C4D3FF;
  border-radius: 20px;
  display: inline-block;
  height: 10px;
  margin: 0 6px;
  padding: 0;
  width: 40px;
  @media (max-width:320px) {
    height: 8px;
    margin: 0 2px;
    width: 24px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    height: 8px;
    margin: 0 2px;
    width: 24px;
  }
`

export default AmenityRating
