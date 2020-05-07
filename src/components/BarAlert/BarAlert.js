import React from 'react'
import Alert from 'react-bootstrap/Alert'

import './BarAlert.scss'

class BarAlert extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: true,
      isDesktop: false
    }
    this.updatePredicate = this.updatePredicate.bind(this)
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ show: false })
    }, 3000)
    this.updatePredicate()
    window.addEventListener("resize", this.updatePredicate)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
    window.removeEventListener("resize", this.updatePredicate)
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 500 });
  }

  handleClose = () => this.setState({ show: false })

  render () {
    const { variant, message, image, heading } = this.props
    return (
      <div>
        {this.state.isDesktop ? (
          <Alert
            dismissible
            show={this.state.show}
            variant={variant}
            onClose={this.handleClose}
            onClick={this.handleClose}
            className={variant}
          >
            <div className="container">
              <Alert.Heading style={{ textAlign: 'center', color: 'grey' }}>
                {heading}
              </Alert.Heading>
              <p className="alert-body" style={{ textAlign: 'center', color: 'grey' }}>{message}</p>
                {image ? (<img src={image} className="image" alt="alert" />) : null}
            </div>
          </Alert> ) : (
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
      )}
      </div>
    )
  }
}

export default BarAlert
