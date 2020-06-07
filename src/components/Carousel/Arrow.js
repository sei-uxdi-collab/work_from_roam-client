/** @jsx jsx **/
import React from 'react'
import { css, jsx } from '@emotion/core'
import leftArrow from './arrowLftVec.png'
import rightArrow from './arrowRghtVec.png'

export const Arrow = ({ direction, handleClick }) => (
  <div
    onClick={handleClick}
    css={css`
      background: #4775FF;
      display: flex;
      position: absolute;
      top: 50%;
      ${direction === 'right' ? `right: 5px` : `left: 5px`};
      height: 20px;
      width: 20px;
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
