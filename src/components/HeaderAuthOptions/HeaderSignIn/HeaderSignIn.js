import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signIn } from '../../../api/auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField'
import PasswordInput from '../../PasswordShowHide/PasswordShowHide'
import './HeaderSignIn.scss'
import messages from '../../AutoAlert/messages'

class HeaderSignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      identifier: '',
      password: '',
    }
  }

  toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => {
        setUser(res.data.user)
        return res.data.user
      })
      .then((user) => alert({
        heading: 'You are now signed in!',
        message: messages.signInSuccess + ', ' + (user.username ?
          user.username : user.email),
        variant: 'light',
        image: 'logo-text-only.svg'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert({
         heading: 'Sign In Failed',
         message: messages.signInFailure,
         variant: 'danger'
       })
      })
  }

  render () {
    const { identifier, password } = this.state

    return (
      <div className="header-signin-container">
        <div className="">
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="identifier" className="mt-4">
              <TextField
                fullWidth={true}
                className="account-info"
                required
                type="identifier"
                name="identifier"
                value={identifier}
                placeholder="Username or Email"
                onChange={this.handleChange}
                InputProps={{
                  disableUnderline: true,
                  "aria-label": "Login",
                }}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <PasswordInput
                fullWidth={true}
                className="account-info password"
                required
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="submit-button"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(HeaderSignIn)
