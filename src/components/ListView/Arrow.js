/** @jsx jsx **/
import React from 'react'
import { css, jsx } from '@emotion/core'
import leftArrow from './arrowLftVec.png'
import rightArrow from './arrowRghtVec.png'

const Arrow = ({ direction, handleClick }) => (
  <div
    onClick={handleClick}
    css={css`
      display: flex;
      position: absolute;
      top: 50%;
      ${direction === 'right' ? `right: 0` : `left: 0`};
      height: 50px;
      width: 50px;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      align-items: center;
      transition: transform ease-in 0.1s;
      &:hover {
        transform: scale(1.1);
      }
      img {
        transform: translateX(${direction === 'left' ? '-2' : '2'}px);
        &:focus {
          outline: 0;
        }
      }
    `}
  >
    {direction === 'right' ? <img src={rightArrow} alt='Right Arrow'/> : <img src={leftArrow} alt='Left Arrow' />}
  </div>
)

export default Arrow
