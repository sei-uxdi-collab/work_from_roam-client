/** @jsx jsx **/
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'

export const ListViewRatings = props => {
  const wifiCount = useState(Math.floor(props.data.avg_wifi))
  const seatingCount = useState(Math.floor(props.data.avg_seating))
  const noiseCount = useState(Math.floor(props.data.avg_noise))

  const yellowTick = (index) => {
      return (
        <div key={index} css={yellowBubble}></div>
      )
  }

  const grayTick = (index) => {
      return (
        <div key={index} css={grayBubble}></div>
      )
  }

  return (
   <div style={{'padding-top': '5px'}}>
     <div css={ratingsRow}>
       <p>WiFi Quality</p>
       <div>
         {Array(wifiCount[0]).fill().map((item, index) => yellowTick(index))}
         {Array(5 - wifiCount[0]).fill().map((item, index) => grayTick(index))}
       </div>
     </div>
     <div css={ratingsRow}>
       <p>Seat Comfort</p>
       <div>
         {Array(seatingCount[0]).fill().map((item, index) => yellowTick(index))}
         {Array(5 - seatingCount[0]).fill().map((item, index) => grayTick(index))}
       </div>
     </div>
     <div css={ratingsRow}>
       <p>Noise Level</p>
       <div>
         {Array(noiseCount[0]).fill().map((item, index) => yellowTick(index))}
         {Array(5 - noiseCount[0]).fill().map((item, index) => grayTick(index))}
       </div>
     </div>
   </div>
  )
}

const ratingsRow = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 5px 16px;
  p {
    color: #222;
    font-family: 'Roboto';
    font-size: 13px;
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
  height: 8px;
  margin: 0 2px;
  padding: 0;
  width: 24px;
`

const grayBubble = css`
  background: #C4D3FF;
  border-radius: 20px;
  display: inline-block;
  height: 8px;
  margin: 0 2px;
  padding: 0;
  width: 24px;
`
