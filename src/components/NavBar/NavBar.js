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
      let redirect = ''
      if (this.props.location.pathname === '/') {
        redirect = '/nav'
      } else {
        redirect ='/'
      }
        return (
            <HashRouter>
              <Link to={redirect}>
                <div className="nav-bar" onClick={this.handleClick} >
                  <img  src="ROME.png" alt="nav-bar" />
                </div>
              </Link>
            </HashRouter>
        )
    }
}

export default withRouter(NavBar)
