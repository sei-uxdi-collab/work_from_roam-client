/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Dot = ({ active }) => (
  <span
    css={css`
      border: 1px solid white;
      padding: 5px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      background: ${active ? '#4775ff' : '#C4D3FF'};
    `}
  />
)

export const Dots = ({ slides, activeIndex, margin }) => (
  <div
    css={css`
      position: absolute;
      bottom: ${margin}px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    {slides.map((slide, i) => (
      <Dot key={slide} active={activeIndex === i} />
    ))}
  </div>
)
