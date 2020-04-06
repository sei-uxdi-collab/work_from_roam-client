/** @jsx jsx **/
import React from 'react'
import { css, jsx } from '@emotion/core'
import img from './cute_buffalo.jpg'

<<<<<<< HEAD
// Custon component imports
import ScaleRating from '../WorkSpace/ScaleRating'

const Slide = ({ content, width, activeIndex }) => (
  <div
    css={css`
=======
const Slide = ({ content, width, activeIndex }) => (
  <div
    css={css`
      border: 1px solid red;
>>>>>>> 2e0ba2ae55ad22cb0d9ac07819016ee83aec2b60
      display: flex;
      flex-direction: column;
      height: 100%;
      width: ${width}px;
      position: inline-block;
      `}
  >
<<<<<<< HEAD
    <div
      css={css`
        width: 100%;
        height: 300px;
        background-image: url(${img});
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
        `} />
    <ScaleRating data={content}/>
    <p>{content.place_id}</p>
=======
    <p>{content.place_id}</p>
    <p>{content.avg_noise}</p>
    <p>{content.id}</p>
    <p>{width}</p>
    <p>{activeIndex}</p>
>>>>>>> 2e0ba2ae55ad22cb0d9ac07819016ee83aec2b60
  </div>
)

export default Slide
