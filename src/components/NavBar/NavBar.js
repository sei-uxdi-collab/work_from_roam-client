import React from 'react'
import { HashRouter, Link, withRouter } from 'react-router-dom'

import './NavBar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }
    handleClick = event => {
      this.setState({ show: !this.state.show })
    }

    render() {
      let redirect = ''
      if (this.props.location.pathname === '/') {
        redirect = '/nav'
      } else {
        redirect ='/'
      }
        return (
            <HashRouter>
              <Link to={redirect}>
                <img onClick={this.handleClick} className="nav-bar" src="ROME.png" alt="nav-bar" />
              </Link>
            </HashRouter>
        )
    }
}

export default withRouter(NavBar)
