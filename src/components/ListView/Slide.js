/** @jsx jsx **/
import React from 'react'
import { css, jsx } from '@emotion/core'

const Slide = ({ content, width, activeIndex }) => (
  <div
    css={css`
      border: 1px solid red;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: ${width}px;
      position: inline-block;
      `}
  >
    <p>{content.place_id}</p>
    <p>{content.avg_noise}</p>
    <p>{content.id}</p>
    <p>{width}</p>
    <p>{activeIndex}</p>
  </div>
)

export default Slide
