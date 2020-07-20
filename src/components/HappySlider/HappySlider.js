import React, { Component } from 'react'

import './HappySlider.scss'

import smiley1 from './Smileys/smiley1.svg'
import smiley2 from './Smileys/smiley2.svg'
import smiley3 from './Smileys/smiley3.svg'
import smiley4 from './Smileys/smiley4.svg'
import smiley5 from './Smileys/smiley5.svg'

class HappySlider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
      name: props.name,
      id: props.id
    }
  }

  handleSmiley = event => {
    this.setState({
      value: event.target.value
    })
    console.log(this.state.value)
    this.setState({ [event.target.name]: event.target.value })
    console.log(this.state.name)
    const number = Math.round(event.target.value)
    console.log('rounded ' + number)

    const smileys = ['', smiley1, smiley2, smiley3, smiley4, smiley5]

    document.documentElement.style.setProperty('--background-image', `url(${smileys[number]})`)
    document.documentElement.style.setProperty('--background-color', 'purple')
  }

  render () {
    const { value, id, name } = this.state

    const rounded = Math.round(value)

    return (
      <div className="slidecontainer">
        <input
          type="range"
          onChange={this.handleSmiley}
          min={this.props.min}
          max={this.props.max}
          id={id}
          name={name}
          value={value}
          className={`smiley-${rounded}`}
          step={0.01}
        />
      </div>
    )
  }
}

export default HappySlider
