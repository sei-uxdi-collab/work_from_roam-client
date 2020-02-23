import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../../api/auth'

class SignOut extends Component {
  componentDidMount () {
    const { history, clearUser, user } = this.props

    signOut(user)
      .finally(() => history.push('/'))
      .finally(() => clearUser())
      console.log('Signout worked!!')
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
