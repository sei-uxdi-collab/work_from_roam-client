import React, { Component } from 'react'

import './HappySlider.scss'

// Relative path does not work for css Variable
// import images into a variable
import smiley1 from './Smileys/smiley1.svg'
import smiley2 from './Smileys/smiley2.svg'
import smiley3 from './Smileys/smiley3.svg'
import smiley4 from './Smileys/smiley4.svg'
import smiley5 from './Smileys/smiley5.svg'

class HappySlider extends Component {

  render () {
    // id used to set background-image of slider thumb
    // Set the CSS variable to match id (i.e. --background-image-id)
    const { id, value, min, max, name, onChange } = this.props

    // Create an array for images
    // Each index coinciding with image number
    const smileys = ['', smiley1, smiley2, smiley3, smiley4, smiley5]

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
          step={0.01}
          type="range"
          value={value}
        />
      </div>
    )
  }
}

export default HappySlider
