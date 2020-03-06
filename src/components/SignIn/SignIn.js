import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signIn } from '../../api/auth'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import '../popUp.scss'

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
    const { history, setUser } = this.props
    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
      })
      console.log('SignIn: ' + this.state.email)
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row popup">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Link to='/'>
            <button style={{float: 'right'}} onClick={this.closeWindow}>Close</button>
          </Link>
          <h3>Sign In</h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
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
