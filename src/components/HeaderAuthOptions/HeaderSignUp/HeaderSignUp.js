import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn, checkemail, checkname } from '../../../api/auth'
import messages from '../../AutoAlert/messages'
import signUpMessages from '../../SignUp/signUpMessages'

import {
  emailTest,
  emailValid,
  usernameTest,
  usernameLength,
  passwordTest,
  passwordLength,
  passwordCapital,
  passwordLower,
  passwordSpecial,
  passwordNumber,
  passwordConfirmationTest
} from '../../../helpers/signUpValidation'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import TextField from '@material-ui/core/TextField'
import PasswordInput from '../../PasswordShowHide/PasswordShowHide'
import './HeaderSignUp.scss'

class HeaderSignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      emailAvail: false,
      emailValid: false,
      emailVal: false,
      username: '',
      usernameVal: false,
      usernameLength: false,
      usernameTaken: false,
      identifier: '',
      submit: false,
      password: '',
      passwordVal: false,
      passwordLength: false,
      passwordCapital: false,
      passwordLower: false,
      passwordSpecial: false,
      passwordNumber: false,
      passwordConfirmation: '',
      passwordConfirmationVal: false,
      property: document.documentElement.style.setProperty('--border-show', 'none')
    }
  }

  checkValid = () => {
    console.log('checkValid')
    this.setState({ emailVal: emailTest(this.state.email, this.state.emailAvail) })
    this.setState({ emailValid: emailValid(this.state.email) })
    this.setState({ usernameVal: usernameTest(this.state.username, this.state.usernameTaken) })
    this.setState({ usernameLength: usernameLength(this.state.username) })
    this.setState({ passwordVal: passwordTest(this.state.password) })
    this.setState({ passwordLength: passwordLength(this.state.password) })
    this.setState({ passwordCapital: passwordCapital(this.state.password) })
    this.setState({ passwordLower: passwordLower(this.state.password) })
    this.setState({ passwordSpecial: passwordSpecial(this.state.password) })
    this.setState({ passwordNumber: passwordNumber(this.state.password) })
    this.setState({ passwordConfirmationVal: passwordConfirmationTest(this.state.password, this.state.passwordConfirmation) })
  }

  handleChange = event => {
    if (event.target.name === 'username') {
      this.setState({
        [event.target.name]: event.target.value
      }, () => checkname(this.state.username)
        .then(res => this.setState({ usernameTaken: res.data }))
        .then(() => { this.checkValid() }))
    } else if (event.target.name === 'email') {
      this.setState({
        [event.target.name]: event.target.value
      }, () => checkemail(this.state.email)
        .then(res => this.setState({ emailAvail: res.data }))
        .then(() => { this.checkValid() }))
    } else {
      this.setState({
        [event.target.name]: event.target.value
      }, () => { this.checkValid() })
    }
  }

  onSignUp = event => {
    event.preventDefault()
    this.setState({
      identifier: this.state.email,
      submit: true })
    this.checkValid()
    this.setState({ property: document.documentElement.style.setProperty('--border-show', 'solid') })
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
      .then(() => history.push('/first-signin'))
      .catch(error => {
        console.error(error)
        // this.setState({ email: '', username: '', password: '', passwordConfirmation: '' })
        alert({
          heading: 'Sign Up Failed',
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const {
      email,
      emailAvail,
      emailValid,
      username,
      usernameLength,
      password,
      passwordConfirmation,
      submit,
      emailVal,
      usernameVal,
      usernameTaken,
      passwordVal,
      passwordConfirmationVal
    } = this.state

    return (
      <div className="header-signup-container">
        <div className="">
          <Form onSubmit={this.onSignUp}>
          <Form.Group controlId="username" className="mt-4">
            <TextField
              fullWidth={true}
              className={!usernameVal ? 'account-info-signup-red username input' : 'account-info-signup username input'}
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
            <Form.Text className={!usernameLength ? 'is-invalid' : 'is-valid'}>
                {submit && !usernameVal && signUpMessages.username }
              </Form.Text>
              <Form.Text className={usernameTaken ? 'is-invalid' : 'is-valid'}>
                {submit && !usernameVal && signUpMessages.usernameTaken}
              </Form.Text>
          </Form.Group>
            <Form.Group controlId="email">
              <TextField
                fullWidth={true}
                className={!emailVal ? 'account-info-signup-red email input' : 'account-info-signup email input'}
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
              <Form.Text className={!emailValid ? 'is-invalid' : 'is-valid'}>
                {submit && !emailVal && signUpMessages.email}
              </Form.Text>
              <Form.Text className={emailAvail ? 'is-invalid' : 'is-valid'}>
                {submit && !emailVal && signUpMessages.emailAvail}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <PasswordInput
                fullWidth={true}
                className={submit && !passwordVal ? 'account-info-signup-red password input' : 'account-info-signup password input'}
                required
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <Form.Text className={!this.state.passwordLength ? 'is-invalid' : 'is-valid'}>
                {submit && !passwordVal && signUpMessages.passwordLength}
              </Form.Text>
              <Form.Text className={!this.state.passwordCapital ? 'is-invalid' : 'is-valid'}>
                {submit && !passwordVal && signUpMessages.passwordCapital}
              </Form.Text>
              <Form.Text className={!this.state.passwordSpecial ? 'is-invalid' : 'is-valid'}>
                {submit && !passwordVal && signUpMessages.passwordSpecial}
              </Form.Text>
              <Form.Text className={!this.state.passwordLower ? 'is-invalid' : 'is-valid'}>
                {submit && !passwordVal && signUpMessages.passwordLower}
              </Form.Text>
              <Form.Text className={!this.state.passwordNumber ? 'is-invalid' : 'is-valid'}>
                {submit && !passwordVal && signUpMessages.passwordNumber}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <PasswordInput
                fullWidth={true}
                className={!passwordConfirmationVal ? 'account-info-signup-red input' : 'account-info-signup input'}
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
              <Form.Text className={!passwordConfirmationVal ? 'is-invalid' : 'is-valid'}>
                {submit && !passwordConfirmationVal && signUpMessages.passwordConfirmation }
              </Form.Text>
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

export default withRouter(HeaderSignUp)
