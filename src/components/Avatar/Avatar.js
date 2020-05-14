import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import './Avatar.scss'

class Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {
        yellow: true,
        brown: false,
        orange: false,
        black: false,
        grey: false,
        misc: false,
      },
      selectedAvatar: props.user && props.user.avatar,
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

  selectAvatar = event => {
    const selectedAvatar = event.target.value
    this.setState({ selectedAvatar })
  }

  onSave = event => {
    if (this.state.selectedAvatar) {
      console.log('make patch request to api')
      alert(`user selected avatar ${this.state.selectedAvatar}. Send patch request to the API`)
    }
    this.props.history.push('/nav')
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
          { user && user.avatar ? 'Update Your Avatar!' : 'Pick Your Avatar!' }
        </div>

        <div className="top-section">
          <div className="avatar-preview">
            <img src="ROME.png" width="100%"/>
          </div>
          <button onClick={this.onSave}>
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
              <button className="avatar-button" onClick={this.selectAvatar} value={'0'} >
                0
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'1'} >
                1
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'2'} >
                2
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'3'} >
                3
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'4'} >
                4
              </button>
            </div>
          )}

          { brown && (
            <div className="avatar-select">
              <button className="avatar-button" onClick={this.selectAvatar} value={'5'} >
                5
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'6'} >
                6
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'7'} >
                7
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'8'} >
                8
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'9'} >
                9
              </button>
            </div>
          )}

          { orange && (
            <div className="avatar-select">
              <button className="avatar-button" onClick={this.selectAvatar} value={'10'} >
                10
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'11'} >
                11
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'12'} >
                12
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'13'} >
                13
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'14'} >
                14
              </button>
            </div>
          )}

          { black && (
            <div className="avatar-select">
              <button className="avatar-button" onClick={this.selectAvatar} value={'15'} >
                15
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'16'} >
                16
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'17'} >
                17
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'18'} >
                18
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'19'} >
                19
              </button>
            </div>
          )}

          { grey && (
            <div className="avatar-select">
              <button className="avatar-button" onClick={this.selectAvatar} value={'20'} >
                20
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'21'} >
                21
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'22'} >
                22
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'23'} >
                23
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'24'} >
                24
              </button>
            </div>
          )}

          { misc && (
            <div className="avatar-select">
              <button className="avatar-button" onClick={this.selectAvatar} value={'25'} >
                25
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'26'} >
                26
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'27'} >
                27
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'28'} >
                28
              </button>
              <button className="avatar-button" onClick={this.selectAvatar} value={'29'} >
                29
              </button>
            </div>
          )}
          
        </div>
        
      </div>
    )
  }
}

export default withRouter(Avatar)