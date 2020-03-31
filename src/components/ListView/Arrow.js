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
      ${direction === 'right' ? `right: 25px` : `left: 25px`};
      height: 50px;
      width: 50px;
      justify-content: center;
      cursor: pointer;
      align-items: center;
      transition: ease-in 0.1s;
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
    {direction === 'right' ? <img src={rightArrow} /> : <img src={leftArrow} />}
  </div>
)

export default Arrow
