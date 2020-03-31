/** @jsx jsx **/
import React from 'react'
import { css, jsx } from '@emotion/core'

const Slide = ({ content }) => (
  <div
    css={css`
      height: 100%;
      width: 100%;
      background-image:'${content};
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      `}
  >
    <h3>{content.place_id}</h3>
  </div>
)

export default Slide
