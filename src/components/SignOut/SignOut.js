import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../../api/auth'
import messages from '../AutoAlert/messages'

class SignOut extends Component {
  componentDidMount () {
    const { alert, history, clearUser, user } = this.props

    signOut(user)
    .finally(() => alert({
      heading: 'Signed Out Successfully',
      message: messages.signOutSuccess,
      variant: 'light',
      image: 'logo-text-only.svg'
    }))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
      console.log('Signout worked!!')
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
