import React from 'react'
import { Link } from 'react-router-dom'

import './Avatar.scss'

export default class Avatar extends React.Component {
  constructor() {
    super()
    this.state = {
      group: {
        yellow: true,
        brown: false,
        orange: false,
        black: false,
        grey: false,
        misc: false,
      },
      selectedAvatar: '',
    }
  }

  render() {
    const { group } = this.state
    const { yellow, brown, orange, black, grey, misc } = group

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

        <div className="avatar-select">
          <div className="select-group">
            <button className="select-button yellow" />
            <button className="select-button brown" />
            <button className="select-button orange" />
            <button className="select-button black" />
            <button className="select-button grey" />
            <button className="select-button misc" />
          </div>
        </div>
      </div>
    )
  }
}
