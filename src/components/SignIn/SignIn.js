import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signIn } from '../../api/auth'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField'


import './SignIn.scss'
import messages from '../AutoAlert/messages'

import PasswordInput from '../PasswordShowHide/PasswordShowHide'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: 'You are now signed In!',
        message: messages.signInSuccess,
        variant: 'success',
        image: 'Roman.png'
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
    const { email, password } = this.state

    return (
      <div className="container popup">

        <Link to='/' className="row close-window m3" style={{ float: "right"}} onClick={this.closeWindow}>
          <img src="close-x-blue.png" alt="close"/>
        </Link>

        <div className="mt-3 p-4">
          <h1>Log in to post a review!</h1>
          <h2 className="mt-3">Don't have an account? <a href="#sign-up" className="link">Sign Up</a></h2>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email" className="mt-4">
              <TextField
                fullWidth="true"
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
                fullWidth="true"
                className="account-info password"
                required
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Link to='/' className="cancel-button m-3" onClick={this.closeWindow}>
              Cancel
            </Link>
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

export default withRouter(SignIn)
