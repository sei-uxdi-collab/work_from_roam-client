/** @jsx jsx **/
import React from 'react'
import { css, jsx } from '@emotion/core'

// Custom component imports
import { ListViewRatings } from './../ListView/ListViewRatings'

export const Slide = ({ content, width, activeIndex }) => {

  // Will eventually be altered to toggle from open/closed states
  const openHours = () => {
    return (
      <div css={hoursCSS}><p>Open Now</p></div>
    )
  }

  const distFromUser = () => {
    return (
      <p>{content.distance} miles away</p>
    )
  }

  const address = () => {
    return (
      <React.Fragment>
        <p>{content.address.slice(0, -5)}</p>
        <p>{content.phone}</p>
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
        <h5 css={headerCSS}>{content.name}</h5>
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
  background-color: #fff;
  border-radius: 20px;
  height: 217px;
  margin: 10px auto;
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
