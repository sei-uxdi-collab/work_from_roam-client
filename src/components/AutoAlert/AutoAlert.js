import React from 'react'
import Alert from 'react-bootstrap/Alert'

import './AutoAlert.scss'

class AutoAlert extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: true
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ show: false })
    }, 6000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  handleClose = () => this.setState({ show: false })

  render () {
    const { variant, heading, message, image } = this.props
    return (
      <Alert
        dismissible
        show={this.state.show}
        variant={variant}
        onClose={this.handleClose}
      >
        <div className="container">
          <Alert.Heading style={{ textAlign: 'center', color: 'grey' }}>
            {heading}
          </Alert.Heading>
          <p className="alert-body" style={{ textAlign: 'center', color: 'grey' }}>{message}</p>
            <img src={image} alt="alert" />
        </div>
      </Alert>
    )
  }
}

export default AutoAlert
