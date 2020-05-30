import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { avatar } from '../../helpers/avatarsArray'
import { updateUser, showUser } from '../../api/auth'

import './Avatar.scss'

class Avatar extends React.Component {
  constructor(props) {
    super(props)
    const { user } = props
    this.state = {
      group: {
        yellow: user ? user.avatar <= 4 : true,
        brown: user ? user.avatar <= 9 && user.avatar >= 5 : false,
        orange: user ? user.avatar <= 14 && user.avatar >= 10 : false,
        black: user ? user.avatar <= 19 && user.avatar >= 15 : false,
        grey: user ? user.avatar <= 25 && user.avatar >= 20 : false,
        misc: user? user.avatar > 25 : false,
      },
      selectedAvatar: user ? user.avatar : null,
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

  onAvatarClick = selectedAvatar => {
    this.setState({ selectedAvatar })
  }

  onKeyDown = event => {
    const selectedAvatar = parseInt(event.target.getAttribute('name'))
    if (event.key === 'Enter') {
      this.onAvatarClick(selectedAvatar)
    } 
  }

  onSave = () => {
    const { user, setUser } = this.props
    if (user) {
      const { email, username } = user
      const avatar = this.state.selectedAvatar || 25
      const properties = { avatar, email, username }
      updateUser(properties, user)
        .then(() => showUser(user))
        .then(res => setUser(res.data.user))
        .catch(console.error)
    }
    this.props.history.push('/nav')
  }

  

  createAvatarButtons = numbers => (
    <div className="avatar-select">
      {numbers.map(number => (
        <div
          tabindex={0}
          className={`avatar-button${this.state.selectedAvatar === number ? " selected" : ''}`}
          onClick={() => this.onAvatarClick(number)}
          onKeyDown={this.onKeyDown}
          name={number}
          >
          <img src={avatar(number)} />
        </div>
      ))}
    </div>
  )

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
            <img src={avatar(this.state.selectedAvatar || 25)}/>
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

          { yellow && this.createAvatarButtons([0,1,2,3,4]) }

          { brown && this.createAvatarButtons([5,6,7,8,9]) }

          { orange && this.createAvatarButtons([10,11,12,13,14]) }

          { black && this.createAvatarButtons([15,16,17,18,19]) }

          { grey && this.createAvatarButtons([20,21,22,23,24,25]) }

          { misc && this.createAvatarButtons([26,27,28,29,30,31])}
          
        </div>
        
      </div>
    )
  }
}

export default withRouter(Avatar)