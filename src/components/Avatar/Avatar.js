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

  selectGroup = event => {
    console.log(event.target.name)
    const selectedName = event.target.name
    this.setState({
      group: {
        yellow: false,
        brown: false,
        orange: false,
        black: false,
        grey: false,
        misc: false,
        [selectedName]: true,
      }
    })
  }

  render() {
    const { group } = this.state
    const { user } = this.props
    const { yellow, brown, orange, black, grey, misc } = group

    return (
      <div className="avatar-container">
        <Link to='/nav'>
          <img className="close-button" alt='close' src='close-x-blue.png' width={'12'} heigth={'12'}/>
        </Link>

        <div className="pick-your-avatar">
          { user ? 'Update Your Avatar!' : 'Pick Your Avatar!' }
        </div>

        <div className="top-section">
          <div className="avatar-preview">
            <img src="ROME.png" width="100%"/>
          </div>
          <button>
            Save
          </button>
        </div>

        <div className="bottom-section">
          <div className="select-group">
            <button name="yellow" onClick={this.selectGroup} className="select-button yellow" />
            <button name="brown" onClick={this.selectGroup} className="select-button brown" />
            <button name="orange" onClick={this.selectGroup} className="select-button orange" />
            <button name="black" onClick={this.selectGroup} className="select-button black" />
            <button name="grey" onClick={this.selectGroup} className="select-button grey" />
            <button name="misc" onClick={this.selectGroup} className="select-button misc" />
          </div>

          { yellow && (
            <div className="avatar-select">
              <button className="avatar-button" >
                1
              </button>
              <button className="avatar-button" >
                2
              </button>
              <button className="avatar-button" >
                3
              </button>
              <button className="avatar-button" >
                4
              </button>
              <button className="avatar-button" >
                5
              </button>
            </div>
          )}

          { brown && (
            <div className="avatar-select">
              <button className="avatar-button" >
                6
              </button>
              <button className="avatar-button" >
                7
              </button>
              <button className="avatar-button" >
                8
              </button>
              <button className="avatar-button" >
                9
              </button>
              <button className="avatar-button" >
                10
              </button>
            </div>
          )}

          { orange && (
            <div className="avatar-select">
              <button className="avatar-button" >
                11
              </button>
              <button className="avatar-button" >
                12
              </button>
              <button className="avatar-button" >
                13
              </button>
              <button className="avatar-button" >
                14
              </button>
              <button className="avatar-button" >
                15
              </button>
            </div>
          )}

          { black && (
            <div className="avatar-select">
              <button className="avatar-button" >
                16
              </button>
              <button className="avatar-button" >
                17
              </button>
              <button className="avatar-button" >
                18
              </button>
              <button className="avatar-button" >
                19
              </button>
              <button className="avatar-button" >
                20
              </button>
            </div>
          )}

          { grey && (
            <div className="avatar-select">
              <button className="avatar-button" >
                21
              </button>
              <button className="avatar-button" >
                22
              </button>
              <button className="avatar-button" >
                23
              </button>
              <button className="avatar-button" >
                24
              </button>
              <button className="avatar-button" >
                25
              </button>
            </div>
          )}

          { misc && (
            <div className="avatar-select">
              <button className="avatar-button" >
                26
              </button>
              <button className="avatar-button" >
                27
              </button>
              <button className="avatar-button" >
                28
              </button>
              <button className="avatar-button" >
                29
              </button>
              <button className="avatar-button" >
                30
              </button>
            </div>
          )}
          
        </div>
        
      </div>
    )
  }
}
