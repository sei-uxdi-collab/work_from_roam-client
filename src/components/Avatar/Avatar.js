import React from 'react'
import { Link } from 'react-router-dom'

import './Avatar.scss'

export default class Avatar extends React.Component {
  constructor() {
    super()
    this.state = {
      yellow: true,
      brown: false,
      orange: false,
      black: false,
      grey: false,
      misc: false,
    }
  }

  render() {
    return (
      <div className="avatar-container">
        <Link to='/nav'>
          <img className="close-button" alt='close' src='close-x-blue.png' width={'12'} heigth={'12'}/>
        </Link>

        <div className="pick-your-avatar">
          Pick Your Avatar!
        </div>

        <div className="avatar-display">
          <div className="avatar-preview">
            <img src="ROME.png" width="100%"/>
          </div>
          <button>
            Save
          </button>
        </div>
      </div>
    )
  }
}
