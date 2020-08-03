import React from 'react'

import './HappySlider.scss'
import { smileys } from './smileys'

// id used to set background-image of slider thumb
// Set the CSS variable to match id (i.e. --background-image-id)
export const HappySlider = ({ id, value, min, max, name, onChange }) => {

    // Round the value of the slider
    // Unecessary if 'step' is set to '1'
    const rounded = Math.round(value)

    // Set the CSS variable from the 'id' of the input
    // and the value of the slider
    document.documentElement.style.setProperty(`--background-image-${id}`, `url(${smileys[rounded]})`)

    return (
      <div className="slidecontainer">
        <input
          id={id}
          onChange={onChange}
          min={min}
          max={max}
          name={name}
          step={1}
          type="range"
          value={value}
        />
      </div>
    )
}
