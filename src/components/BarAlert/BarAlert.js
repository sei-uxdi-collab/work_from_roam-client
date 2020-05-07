import React from 'react'
import Alert from 'react-bootstrap/Alert'

import './BarAlert.scss'

class BarAlert extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: true
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ show: false })
    }, 3000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  handleClose = () => this.setState({ show: false })

  render () {
    const { variant, message } = this.props
    return (
      <Alert
        style={{
          borderRadius: '0px',
          width: '100vw',
          height: '39px',
          padding: '11px',
          textAlign: 'center',
          color: 'black',
          backgroundColor: '#a4ff2e',
          fontSize: '11px',
          fontFamily: 'Roboto',
          fontWeight: '500',
          top: '2%' }}
        show={this.state.show}
        variant={variant}
        onClose={this.handleClose}
        onClick={this.handleClose}
        className={variant}
      >
        <div>{message}</div>
      </Alert>
    )
  }
}

export default BarAlert
