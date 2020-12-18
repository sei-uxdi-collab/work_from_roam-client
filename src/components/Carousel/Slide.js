/** @jsx jsx **/
import React from 'react'
import { withRouter } from 'react-router-dom'
import { css, jsx } from '@emotion/core'
import { Button } from 'react-bootstrap'

// Custom component imports
import { ListViewRatings } from './../ListView/ListViewRatings'
import { getAddressLine1 } from './../../helpers/getAddressLine1.js'
import { getAddressLine2 } from './../../helpers/getAddressLine2.js'


const Slide = ( { key, content, width, history, toggleListView }) => {
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
        <div css={addressCSS}>{getAddressLine1(content.addresscomponent)}</div>
        <div css={addressCSS}>{getAddressLine2(content.addresscomponent)}</div>
      </React.Fragment>
    )
  }

  const onClick = () => {
    const { id } = content
    history.push(`/workspace/${id}`)
    toggleListView()
  }

  return (
    <div
      key={key}
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
        <div css={css`
            align-items: center;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;`}>
          <h5 css={headerCSS}>{content.name}</h5>
          <Button variant="outline-success"
            size="sm"
            onClick={onClick}
            style={{borderRadius: '18px', marginRight: '16px'}}>
              Go!
          </Button>
        </div>
        <div css={infoCSS}>
          {openHours()}
          {distFromUser()}
        </div>
        <div>
          {address()}
        </div>
        <ListViewRatings data={content} />
      </div>
    </div>
  )
}

export default withRouter(Slide)

const cardCSS = css`
  background-color: #fff;
  border-radius: 20px;
  height: 217px;
  margin: 10px auto;
  width: 252px;
  overflow-y: auto;
  box-shadow: 2px 8px 16px
    rgba(0, 0, 0, 0.25);
`

const headerCSS = css`
  color: #222;
  margin: 10px 16px;
  font-family: Roboto;
  font-weight: 500;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  // Temporarily hiding the Open Hours
  display: none;

  background: #A4FF2E;
  border-radius: 31px;
  height: 20px;
  margin-right: 5px;
  width: 71px
`

const addressCSS = css`
  color: #222222;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  margin-left: 16px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap
`
