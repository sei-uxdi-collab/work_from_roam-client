import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { changePassword } from '../../api/auth'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PasswordInput from '../PasswordShowHide/PasswordShowHide'
import './ChangePassword.scss'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { history, user, alert } = this.props

    changePassword(this.state, user)
      .then(() => {
        alert({
          heading: 'Success',
          message: 'Your password has been updated',
          variant: 'light',
          image: 'Roman.png'
        })
        history.push('/')
      })
      .catch(error => {
        alert({
          heading: 'Failed',
          message: 'Check your password and try again',
          variant: 'danger'
        })
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '', newPasswordConfirmation: '' })
      })
  }

  render () {
    const { oldPassword, newPassword, newPasswordConfirmation } = this.state

    return (
      <div className="container popup">

        <Link to='/' className="row close-window-blue" style={{ float: "right"}} onClick={this.closeWindow}>
          <img src="close-x-blue.png" alt="close"/>
        </Link>

        <div className="mt-3 p-4">
          <h1 className="mb-3">Choose your new password!</h1>
          <Form onSubmit={this.onChangePassword}>
            <Form.Group controlId="oldPassword">
              <PasswordInput
                fullWidth={true}
                className="account-info password"
                required
                name="oldPassword"
                value={oldPassword}
                placeholder="Old Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <PasswordInput
                fullWidth={true}
                className="account-info password"
                required
                name="newPassword"
                value={newPassword}
                placeholder="New Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="newPasswordConfirmation">
              <PasswordInput
                fullWidth={true}
                className="account-info password"
                required
                name="newPasswordConfirmation"
                value={newPasswordConfirmation}
                placeholder="New Password Confirmation"
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

export default withRouter(ChangePassword)
