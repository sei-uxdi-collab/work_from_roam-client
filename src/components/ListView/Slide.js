/** @jsx jsx **/
import React from 'react'
import { css, jsx } from '@emotion/core'
import img from './cute_buffalo.jpg'

// Custon component imports
import ScaleRating from '../WorkSpace/ScaleRating'

const Slide = ({ content, width, activeIndex }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      height: 100%;
      width: ${width}px;
      position: inline-block;
      `}
  >
    <div
      css={css`
        width: 100%;
        height: 300px;
        background-image: url(${img});
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: center;
        `}
    />
      <ScaleRating data={content}/>
      <p>{content.place_id}</p>
      <p>{content.id}</p>
  </div>
)

export default Slide
