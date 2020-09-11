import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn, checkemail, checkname } from '../../../api/auth'
import messages from '../../AutoAlert/messages'
import signUpMessages from '../../SignUp/signUpMessages'

import * as validations from '../../../helpers/signUpValidation'

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
      openEmal: false,
      openPass: false,
      openUser: false,
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
  // Set state of all fields using helper functions
  checkValid = () => {
    this.setState({ emailVal: validations.emailTest(this.state.email, this.state.emailAvail) })
    this.setState({ emailValid: validations.emailValid(this.state.email) })
    this.setState({ usernameVal: validations.usernameTest(this.state.username, this.state.usernameTaken) })
    this.setState({ usernameLength: validations.usernameLength(this.state.username) })
    this.setState({ passwordVal: validations.passwordTest(this.state.password) })
    this.setState({ passwordLength: validations.passwordLength(this.state.password) })
    this.setState({ passwordCapital: validations.passwordCapital(this.state.password) })
    this.setState({ passwordLower: validations.passwordLower(this.state.password) })
    this.setState({ passwordSpecial: validations.passwordSpecial(this.state.password) })
    this.setState({ passwordNumber: validations.passwordNumber(this.state.password) })
    this.setState({ passwordConfirmationVal: validations.passwordConfirmationTest(this.state.password, this.state.passwordConfirmation) })
  }

  handleChange = event => {
    // Conditional to check if username is in the database
    if (event.target.name === 'username') {
      this.setState({
        [event.target.name]: event.target.value
        // Set the state and check for username in database
      }, () => checkname(this.state.username)
        // Data retrieved from checkname is boolean.
        .then(res => this.setState({ usernameTaken: res.data }))
        // Check if target is valid
        .then(() => { this.checkValid() }))
    // Check for email in the database
    } else if (event.target.name === 'email') {
      this.setState({
        [event.target.name]: event.target.value
      }, () => checkemail(this.state.email)
        .then(res => this.setState({ emailAvail: res.data }))
        .then(() => { this.checkValid() }))
    } else {
      // Set and check remaining targets
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
    // Check if fields are valid
    this.checkValid()
    // Set border property to show red or green border
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
        alert({
          heading: 'Sign Up Failed',
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  // Hover effect opens error message on web browser.
  // Needs to be tested on mobile
  onHover = (prevState, state) => {
      this.setState({ [`${state}`]: !prevState })
  }

  render () {
    const {
      email,
      openEmail,
      openUser,
      openPass,
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
            {submit && !usernameVal && <div className='image-div'><img
                src={'red-x.svg'}
                alt='red-x'
                className={!usernameVal ? 'red-x' : 'green-check'}
                onMouseEnter={!usernameVal ? () => this.onHover(this.state.openUser, 'openUser') : undefined}
                onMouseLeave={!usernameVal ? () => this.onHover(this.state.openUser, 'openUser') : undefined}
              /></div>}
              {openUser && <div className='error-message-div'>
                <div>{submit && !usernameVal && !usernameLength && signUpMessages.username}</div>
                <div>{submit && !usernameVal && usernameTaken && signUpMessages.usernameTaken}</div>
              </div>}
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
              {submit && !emailVal && <div className='image-div'><img
                src='red-x.svg'
                alt='red-x'
                className={!emailVal ? 'red-x' : 'green-check'}
                onMouseEnter={!emailVal ? () => this.onHover(this.state.openEmail, 'openEmail') : undefined}
                onMouseLeave={!emailVal ? () => this.onHover(this.state.openEmail, 'openEmail') : undefined}
              /></div>}
              {openEmail && <div className='error-message-div'>
                <div>{submit && !emailVal && !emailValid && signUpMessages.email}</div>
                <div>{submit && !emailVal && emailAvail && signUpMessages.emailAvail}</div>
              </div>}
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
              {submit && !passwordVal && <div className='image-div'><img
                src='red-x.svg'
                alt='red-x'
                className={!passwordVal ? 'red-x' : 'green-check'}
                onMouseEnter={!passwordVal ? () => this.onHover(this.state.openPass, 'openPass') : undefined}
                onMouseLeave={!passwordVal ? () => this.onHover(this.state.openPass, 'openPass') : undefined}
              /></div>}
              {openPass && <div className='error-message-div'>
                <div>{submit && !passwordVal && !this.state.passwordLength && signUpMessages.passwordLength}</div>
                <div>{submit && !passwordVal && !this.state.passwordCapital && signUpMessages.passwordCapital}</div>
                <div>{submit && !passwordVal && !this.state.passwordSpecial && signUpMessages.passwordSpecial}</div>
                <div>{submit && !passwordVal && !this.state.passwordLower && signUpMessages.passwordLower}</div>
                <div>{submit && !passwordVal && !this.state.passwordNumber && signUpMessages.passwordNumber}</div>
              </div>}
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
              {submit && !passwordConfirmationVal && <div className='image-div'><img
                src={'red-x.svg'}
                alt='red-x'
                className={!passwordConfirmationVal ? 'red-x' : 'green-check'}
              /></div>}
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
