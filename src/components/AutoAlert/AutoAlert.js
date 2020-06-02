import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { Row, Col } from 'react-bootstrap';

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
        onClick={this.handleClose}
        className={variant}
      >
        <div className="container">
          <Row>
            {image ? (<Col xs={6}><img src={image} className="image" alt="alert" /></Col>) : null}
            <Col className="alert-text">
              <Alert.Heading className="alert-header">
                {heading}
              </Alert.Heading>
              <p className="alert-body">{message}</p>
            </Col>
          </Row>
        </div>
      </Alert>
    )
  }
}

export default AutoAlert
