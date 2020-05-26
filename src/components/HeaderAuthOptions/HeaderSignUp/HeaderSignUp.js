import React, { Component } from 'react'

import { signUp, signIn } from '../../../api/auth'
import messages from '../../AutoAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField'
import PasswordInput from '../../PasswordShowHide/PasswordShowHide'
import './HeaderSignUp.scss'

class HeaderSignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      username: '',
      identifier: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()
    this.setState({ identifier: this.state.email })
    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'light',
        image: 'logo-text-only.svg'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', username: '', password: '', passwordConfirmation: '' })
        alert({
          heading: 'Sign Up Failed',
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, username, password, passwordConfirmation } = this.state

    return (
      <div className="header-signup-container">
        <div className="">
          <Form onSubmit={this.onSignUp}>
          <Form.Group controlId="username" className="mt-4">
            <TextField
              fullWidth={true}
              className="account-info"
              required
              type="username"
              name="username"
              value={username}
              placeholder="Username"
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true,
                "aria-label": "Username",
              }}
            />
          </Form.Group>
            <Form.Group controlId="email">
              <TextField
                fullWidth={true}
                className="account-info"
                required
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
                InputProps={{
                  disableUnderline: true,
                  "aria-label": "Email",
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
            <Form.Group controlId="passwordConfirmation">
              <PasswordInput
                fullWidth={true}
                className="account-info password"
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                placeholder="Confirm Password"
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

export default HeaderSignUp
