import React from 'react'

const scaleStyle = {
  position: 'absolute',
  left: '32.16%',
  right: '4.68%',
  top: '19.01%',
  bottom: '80.99%',

  border: '1px solid #FFFFFF',
  transform: 'rotate(-0.14deg)',
}

class ScaleRating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wifiRating: '',
      noiseRating: '',
      seatingRating: '',
      bathroomRating: ''
    }
  }

  render() {
    return (
      <div>
        <div style={ scaleStyle }></div>
      </div>
    )
  }
}

export default ScaleRating
