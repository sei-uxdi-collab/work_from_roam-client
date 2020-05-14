import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { showUser } from '../../api/auth'
import messages from '../AutoAlert/messages'

class ShowUser extends Component {
  componentDidMount () {
    const { alert, history, user, setUser } = this.props
    
    showUser(user)
    .then(res => setUser(res.data.user))
    .then(() => alert({
      heading: 'Showed User Successfully',
      message: messages.signOutSuccess,
      variant: 'light',
      image: 'logo-text-only.svg'
    }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    return ''
  }
}

export default withRouter(ShowUser)
