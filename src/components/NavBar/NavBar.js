import React from 'react'
import { HashRouter, Link, withRouter } from 'react-router-dom'

import './NavBar.scss'

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
      const path = this.props.location.pathname
      const redirect = path === '/nav' ? '/' : '/nav'
        return (
            <HashRouter>
              <Link to={redirect}>
                <div className="nav-bar" onClick={this.handleClick} >
                  <img  src="hamburger.svg" className="hamburger" alt="nav-bar" />
                </div>
              </Link>
            </HashRouter>
        )
    }
}

export default withRouter(NavBar)

