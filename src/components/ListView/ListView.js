import React from 'react';
<<<<<<< HEAD
import './ListView.scss'
<<<<<<< HEAD
=======
>>>>>>> Addded initial code for ListView functionality. Need to figure out how to get it to display on the application, on all views.
=======
// import { HashRouter, Link, withRouter } from 'react-router-dom'

>>>>>>> Initial styling for ListView

class ListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
<<<<<<< HEAD
      worskspaceList: '',
<<<<<<< HEAD
      expanded: false
=======
      worskspaceList: ''
>>>>>>> Addded initial code for ListView functionality. Need to figure out how to get it to display on the application, on all views.
=======
      expand: false
>>>>>>> Initial styling for ListView
    }
  }

  handleClick = event => {
    this.setState({ expand: !this.state.expand })
    return (
      <div className='list-view-expand'>
      </div>
    )
  }

  render () {
    // let redirect = ''
    // if (this.props.location.pathname === '/') {
    //   redirect = '/list-view'
    // } else {
    //   redirect ='/'
    // }

    return (
<<<<<<< HEAD
      <div className='list-view'>
<<<<<<< HEAD
=======
      <div className='list-view' onClick={this.handleClick} >
>>>>>>> Initial styling for ListView
        <p>List View</p>
=======
        <h3>List View</h3>
>>>>>>> Addded initial code for ListView functionality. Need to figure out how to get it to display on the application, on all views.
      </div>
    )
  }
}

export default ListView
