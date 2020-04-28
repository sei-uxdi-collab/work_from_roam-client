/** @jsx jsx **/
import React from 'react'
import { css, jsx } from '@emotion/core'
// import img from './cute_buffalo.jpg'

// Custon component imports
// import ScaleRating from '../WorkSpace/ScaleRating'
import ListViewRatings from './ListViewRatings'

const Slide = ({ content, width, activeIndex }) => {

  // Will eventually be altered to toggle from open/closed states
  const openHours = () => {
    return (
      <div css={hoursCSS}><p>Open Now</p></div>
    )
  }

  const distFromUser = () => {
    return (
      <p>.5 miles away</p>
    )
  }

  const address = () => {
    return (
      <React.Fragment>
        <p>1 Financial Center, Boston, MA 02210</p>
        <p>(555) 555-5555</p>
      </React.Fragment>
    )
  }

  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: ${width}px;
        position: inline-block;
        `}
    >
      <div css={cardCSS}>
        <h5 css={headerCSS}>Place #{content.id}</h5>
        <div css={infoCSS}>
          {openHours()}
          {distFromUser()}
        </div>
        <div css={addressCSS}>
          {address()}
        </div>
        <ListViewRatings data={content} />
      </div>
    </div>

  )
}

const cardCSS = css`
  align-self: center;
  background-color: #fff;
  border-radius: 20px;
  height: 217px;
  margin: 20px auto;
  width: 252px;
  box-shadow: 2px 8px 16px
    rgba(0, 0, 0, 0.25);
`

const headerCSS = css`
  color: #222;
  margin: 10px 16px;
  font-family: Roboto;
  font-weight: 500;
  text-align: left;
`

const infoCSS = css`
  display: flex;
  flex-direction: row;
  margin: 10px 16px;
  p {
    color: #222;
    font-family: Roboto;
    font-weight: 300;
    font-size: 13px;
    margin: 0;
  }
`

const hoursCSS = css`
  background: #A4FF2E;
  border-radius: 31px;
  height: 20px;
  margin-right: 5px;
  width: 71px
`

const addressCSS = css`
margin: 16px;
p {
  color: #222;
  font-family: Roboto;
  font-weight: 300;
  font-size: 13px;
  margin: 0;
  text-align: left;
}
`

export default Slide
