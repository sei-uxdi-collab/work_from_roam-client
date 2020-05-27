import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import './SplashPage.scss'

class SplashPage extends React.Component {
  constructor () {
    super()

    this.state = {
      display: true
    }
  }

  handleDisplay = () => {
    this.setState({ display: false })
  }

  render () {

    return (
      <div className={this.state.display ? 'splash' : 'fadeOut'}>
          <Link to="" onClick={this.handleDisplay} className="p-0">
            <img src="close-x-blue.png" className="splash-x" alt="close"/>
          </Link>
        <div style={{ marginTop: '16vh' }}>
          <img
            src='splash-logo.svg'
            className='splash-logo'
            alt='logo'
          />
        </div>
        <p className='splash-message'>
          Find your perfect workspace
        </p>
          <Button className='splash-button' onClick={this.handleDisplay}>
            Open the map
          </Button>
      </div>
    )
  }
}

export default SplashPage
